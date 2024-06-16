import { Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { comparePassword } from 'src/utils/bcrypt';
import * as loadsh from 'lodash';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const { username, password, roles_id, department_id } = createUserDto;
    //查询数组roleIds对应所有role的实例
    const roles = roles_id
      ? await this.roleRepository.find({
        where: {
          id: In(roles_id),
        },
      })
      : null;
    const department = department_id
      ? await this.departmentRepository.findOneBy({
        id: +department_id,
      })
      : null;

    return this.userRepository.save({
      username,
      password,
      roles,
      department,
    });
  }

  // 查询用户列表
  async findMany({
    username,
    phone,
    status,
    start_time,
    end_time,
    page = 1,
    pageSize = 10,
  }) {
    const QueryBuilder = this.userRepository.createQueryBuilder('user');
    QueryBuilder.leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.roles', 'roles')
      // .leftJoinAndSelect('user.roles', 'roles')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (username) {
      QueryBuilder.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }
    if (phone) {
      QueryBuilder.andWhere('user.phone =:phone', { phone });
    }
    if (status) {
      QueryBuilder.andWhere('user.status =:status', { status });
    }
    if (start_time && end_time) {
      QueryBuilder.andWhere(
        'user.create_time BETWEEN :start_time AND :end_time',
        { start_time, end_time },
      );
    }

    const res = await QueryBuilder.getMany();
    const list = res.map(({ department, ...params }) => {
      return {
        ...params,
        department_name: department ? department.name : '',
        department_id: department ? department.id : '',
        // roles_name: roles ? roles.id : '',
        // rolesIds: roles ? roles.id : '',
      };
    });
    return {
      list: list,
      total: await QueryBuilder.getCount(),
      page,
      pageSize,
    };
  }

  // 通过id查询用户
  async findOneById(id: number) {
    const user = await this.userRepository.find({
      where: { id },
      relations: ['roles'],
    });
    let roles = [];
    user[0].roles.forEach((role) => {
      roles.push(role.name);
    });
    user[0].roles = roles;
    return user;
  }

  // 通过用户名查询用户
  async findOne(username: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select()
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();
  }

  // 是否存在用户
  async isExistUser(username: string) {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .where('user.username=:username', { username })
      .getOne();
    console.log(res, 'res');

    return res;
  }

  // 验证用户账号
  async avalidateUser(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username=:username', { username })
      .select()
      .addSelect('user.password')
      .getOne();
    // console.log(user, 'user');
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (!comparePassword(password, user.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  // 修改用户
  async updateUser(user: UpdateUserDto) {
    const { id, ...params } = user;
    const hasUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!hasUser) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    if (params.nickname) hasUser.nickname = params.nickname;
    if (params.department_id) {
      hasUser.department = await this.departmentRepository.findOneBy({
        id: +params.department_id,
      });
    }
    if (params.roles_id) {
      hasUser.roles = await this.roleRepository.find({
        where: { id: In(params.roles_id) },
      });
    }
    if (params.position_id) {
      hasUser.position = await this.positionRepository.findOneBy({
        id: +params.position_id,
      });
    }
    if (params.phone) hasUser.phone = params.phone;
    if (params.email) hasUser.email = params.email;
    if (params.sex) hasUser.sex = params.sex;
    if (params.status) hasUser.status = params.status;
    if (params.notes) hasUser.notes = params.notes;

    return await this.userRepository.save(hasUser);
  }

  // 获取路由
  async getUserRoutes(userId: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.menus', 'menus')
      .getMany();
    const menus = [];
    user.forEach((item) => {
      item.roles.forEach((role) => {
        role.menus.forEach((menu) => {
          menus.push(menu);
        });
      });
    });
    console.log(menus, 'menus');
    return loadsh.uniqBy(menus, 'id');
  }
}

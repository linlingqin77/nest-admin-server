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
import { ResultData } from 'src/utils/result';
import { encryptPassword } from 'src/utils/bcrypt';
import { handleTree } from 'src/utils/convertToTree';
import { getRouteName } from './util';
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
  ) {}
  async create(createUserDto: CreateUserDto) {
    const {
      username,
      password,
      role_ids,
      department_id,
      position_ids,
      email,
      phone,
      notes,
      nickname,
    } = createUserDto;
    //查询数组roleIds对应所有role的实例
    const roles = role_ids
      ? await this.roleRepository.find({
          where: {
            id: In(role_ids),
          },
        })
      : null;
    const department = department_id
      ? await this.departmentRepository.findOneBy({
          id: +department_id,
        })
      : null;
    const position = position_ids
      ? await this.positionRepository.find({
          where: { id: In(position_ids) },
        })
      : null;

    if (!department) return ResultData.fail(500, '该部门不存在');
    if (!roles) return ResultData.fail(500, '该角色不存在');
    if (!position) return ResultData.fail(500, '该岗位不存在');
    const newUser = this.userRepository.create();
    newUser.roles = roles;
    newUser.department = department;
    newUser.position = position;
    newUser.password = encryptPassword(password);
    newUser.username = username;
    newUser.nickname = nickname;
    newUser.email = email;
    newUser.phone = phone;
    newUser.notes = notes;
    const data = this.userRepository.save(newUser);
    return ResultData.ok(data, '注册成功');
  }

  // 查询列表分页
  /***
   * @param: all 1:查询所有 0:查询分页 为0
   */
  async findMany(parmas) {
    const QueryBuilder = this.userRepository.createQueryBuilder('user');
    const {
      username,
      phone,
      status,
      start_time,
      end_time,
      department_id,
      all = 0,
      page = 1,
      pageSize = 10,
    } = parmas;
    QueryBuilder.leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.position', 'position');
    if (username)
      QueryBuilder.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    if (phone) QueryBuilder.andWhere('user.phone =:phone', { phone });
    if (status) QueryBuilder.andWhere('user.status =:status', { status });
    if (department_id) {
      QueryBuilder.andWhere('user.department =:department', {
        department: department_id,
      });
    }

    if (start_time && end_time)
      QueryBuilder.andWhere(
        'user.create_time BETWEEN :start_time AND :end_time',
        { start_time, end_time },
      );
    const [list, total] = all
      ? await QueryBuilder.getManyAndCount()
      : await QueryBuilder.skip((page - 1) * pageSize)
          .take(pageSize)
          .getManyAndCount();

    list.forEach((item) => {
      item['department_id'] = item?.department?.id;
      item['role_ids'] = item?.roles?.map((item) => item.id);
      item['position_ids'] = item?.position?.map((item) => item.id);
    });

    const data = all ? { list, total } : { list, total, page, pageSize };
    return ResultData.ok(data, '查询成功');
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
    if (params.role_ids) {
      hasUser.roles = await this.roleRepository.find({
        where: { id: In(params.role_ids) },
      });
      console.log(hasUser.roles, 'hasUser.roleshasUser.roleshasUser.roles');
    }
    if (params.position_ids) {
      hasUser.position = await this.positionRepository.find({
        where: { id: In(params.position_ids) },
      });
    }
    if (params.phone) hasUser.phone = params.phone;
    if (params.email) hasUser.email = params.email;
    if (params.sex) hasUser.sex = params.sex;
    if (params.status) hasUser.status = params.status;
    if (params.notes) hasUser.notes = params.notes;

    const data = await this.userRepository.save(hasUser);
    return ResultData.ok(data, '修改成功');
  }

  // 获取路由
  async getUserRoutes(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    const roles = await this.roleRepository.find({
      where: { id: In(user.roles.map((item) => item.id)), status: '0' },
      relations: ['menus'],
      order: { order: 'ASC' },
    });
    let routes = [];
    roles.forEach((item) => {
      item.menus.forEach((item1) => {
        const route = {};
        if (item1.type == '1') {
          route['component'] = 'Layouts';
        }
        if (item1.type == '2') {
          route['component'] = item1.component;
        }
        if (item1.type == '3') {
          return;
        }
        route['path'] = item1.router_path;
        route['name'] = getRouteName(item1);
        route['id'] = item1.id;
        route['parent_id'] = item1.parent_id;
        route['type'] = item1.type;
        route['meta'] = {
          title: item1.name,
          svgIcon: item1.icon,
        };
        routes.push(route);
      });
    });
    routes = handleTree(routes, 'id', 'parent_id');
    return ResultData.ok(roles, '查询成功');
  }
}

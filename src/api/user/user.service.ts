import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Department } from '../department/entities/department.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { comparePassword } from 'src/utils/bcrypt';
import * as loadsh from 'lodash';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { nickname, password, roleIds } = createUserDto;
    //查询数组roleIds对应所有role的实例
    const roles = await this.roleRepository.find({
      where: {
        id: In(roleIds),
      },
    });

    return this.userRepository.save({
      nickname,
      password,
      roles,
    });
  }

  // 查询用户列表
  async findMany({
    nickname,
    phone,
    is_disable,
    start_time,
    end_time,
    page = 1,
    pageSize = 10,
  }) {
    const QueryBuilder = this.userRepository.createQueryBuilder('user');
    QueryBuilder.leftJoinAndMapOne(
      'user.department', // 关联关系
      Department, // 目标实体
      'departmentName', // 映射到的结果属性名
      'user.departmentId = department.id', // 联接条件
    )
      .select([
        'user.*', // 选择用户的所有字段
        'departmentName.name', // 选择部门的name字段
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (nickname) {
      QueryBuilder.andWhere('user.nickname LIKE :nickname', {
        nickname: `%${nickname}%`,
      });
    }
    if (phone) {
      QueryBuilder.andWhere('user.phone =:phone', { phone });
    }
    if (is_disable) {
      QueryBuilder.andWhere('user.is_disable =:is_disable', { is_disable });
    }
    if (start_time && end_time) {
      QueryBuilder.andWhere(
        'user.create_time BETWEEN :start_time AND :end_time',
        { start_time, end_time },
      );
    }

    const res = await QueryBuilder.getMany();
    return {
      list: res,
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
  async findOne(nickname: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select()
      .addSelect('user.password')
      .where('user.nickname=:nickname', { nickname })
      .getOne();
  }

  // 是否存在用户
  async isExistUser(nickname: string) {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .where('user.nickname=:nickname', { nickname })
      .getOne();
    console.log(res, 'res');

    return res;
  }

  // 验证用户账号
  async avalidateUser(nickname: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.nickname=:nickname', { nickname })
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

  async findUserInfo() {}

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

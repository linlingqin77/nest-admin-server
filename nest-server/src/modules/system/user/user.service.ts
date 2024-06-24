/*
 * @Description: 用户管理 service
 */

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ReqUserDto from './dto/req-user.dto';
import { User } from './entities/user.entity';
import { SharedService } from 'src/shared/shared.service';
import { ReqAddUserDto } from './dto/req-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRedis() private readonly redis: Redis,
    private readonly sharedService: SharedService,
  ) {}

  /* 新增用户 */
  async addUser(reqAddUserDto: ReqAddUserDto) {
    if (reqAddUserDto.password) {
      reqAddUserDto.salt = this.sharedService.generateUUID();
      reqAddUserDto.password = this.sharedService.md5(
        reqAddUserDto.password + reqAddUserDto.salt,
      );
    }
    return await this.userRepository.save(reqAddUserDto);
  }

  /* 通过用户名获取用户,排除停用和删除的,用于登录 */
  async findOneByUsername(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user.userId')
      .addSelect('user.userName')
      .addSelect('user.password')
      .addSelect('user.salt')
      // .addSelect('user.dept')
      // .leftJoinAndSelect('user.dept', 'dept')
      .where({
        userName: username,
        delFlag: '0',
        status: '0',
      })
      .getOne();
    return user;
  }

  /* 通过用户名获取用户,排除删除的 */
  async findOneByUserNameState(username: string) {
    return await this.userRepository.findOne({
      select: ['userId', 'userName', 'password', 'salt', 'status', 'delFlag'],
      where: {
        userName: username,
        delFlag: '0',
      },
    });
  }
}

import { Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from './entities/user-login.entity';
import { Repository } from 'typeorm';
import { encryptPassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '../redis/redis-cache/redis-cache.service';
import * as REDIS from 'src/config/RedisKeyPrefix';
import * as CONST from 'src/config/timeLength';
import { ToolsCaptcha } from 'src/utils/captcha';
import { CreateEncrypt } from 'src/utils/createEncrypt';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Session,
  Res,
} from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    @InjectRepository(UserLogin)
    private readonly userLoginRepository: Repository<UserLogin>,
    private readonly JwtService: JwtService,
    private readonly RedisCacheService: RedisCacheService,
    private readonly ToolsCaptcha: ToolsCaptcha,
  ) {}
  // 登录
  async login(userLogin: LoginAuthDto) {
    // 到这里账号密码正确
    // 1.到这一步的账号密码都是正确的 判断验证码是否正确
    const userInfo = await this.UserService.findOne(userLogin.nickname);

    console.log(userInfo, 'userInfo');

    await this.compareCode({ ...userLogin });
    const token = this.createToken(userInfo);
    // // 2.生成token 并且存入redis
    // // 在登录时，将jwt生成的token，存入redis, 并设置有效期为30分钟。存入redis的key由用户id组成， value是token值
    this.RedisCacheService.cacheSet(
      `${REDIS.RedisPrefixToken}${userInfo.id}`,
      `${token}`,
      CONST.TOKEN_FIRST_SET_TIME,
    );
    // // 3.保存的数据集
    let row = this.userLoginRepository.create({
      user_id: userInfo.id,
      nickname: userInfo.nickname,
      token,
    });

    const loginUser = await this.userLoginRepository.find({
      where: {
        user_id: userInfo.id,
      },
    });
    console.log(333, loginUser);
    // 判断用户表中是否已登录信息 如果有则覆盖 无则插入
    if (loginUser) {
      await this.userLoginRepository.delete({ user_id: userInfo.id });
    }
    await this.userLoginRepository.insert(row);
    return {
      user_id: userInfo.id,
      nickname: userInfo.nickname,
      token,
    };
  }

  // 注册
  async register(CreateUserDto: CreateUserDto) {
    if (await this.UserService.isExistUser(CreateUserDto.nickname)) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    CreateUserDto.password = encryptPassword(CreateUserDto.password);
    return await this.UserService.create(CreateUserDto);
  }

  // 创建token
  createToken(payload) {
    const row = {
      nickname: payload.nickname,
      password: payload.password,
      id: payload.id,
    };
    return this.JwtService.sign(row);
  }

  // 获取验证码
  // 生成验证码
  async getCode(res, req) {
    // // 1.创建验证码
    const svgCaptcha = this.ToolsCaptcha.captcha(); //创建验证码
    const codeId = new CreateEncrypt().nanoid(); //编码一个id
    console.log(svgCaptcha.text.toLocaleLowerCase(), 'svgCaptcha.text');

    // // 2.存入redis中  key value 过期时间(秒)
    this.RedisCacheService.cacheSet(
      `${REDIS.RedisPrefixCaptcha}${codeId}`,
      `${svgCaptcha.text.toLocaleLowerCase()}`,
      CONST.CAPCODE_FIRST_SET_TIME,
    );
    // // 3.返回
    // return {
    //   key: codeId,
    //   svg: svgCaptcha.data
    // }
    // req.session.codeId = '123456'
    console.log(req.session.codeId, 'req');
    res.type('image/svg+xml');
    req.session.codeId = codeId;
    res.send(svgCaptcha.data);
  }

  // 验证码判断
  async compareCode(post) {
    console.log(post, 888888);
    if (!post.code || !post.codeId) {
      throw new HttpException('验证码为空', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const key = `${REDIS.RedisPrefixCaptcha}${post.codeId}`;
      const value = await this.RedisCacheService.cacheGet(key);
      if (!value) {
        throw new HttpException(
          '验证码已过期',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (value !== post.code.toLocaleLowerCase()) {
        throw new HttpException(
          '验证码不正确',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        // 验证完之后，删掉此验证码
        await this.RedisCacheService.cacheDel(key);
      }
    }
    return true;
  }
}

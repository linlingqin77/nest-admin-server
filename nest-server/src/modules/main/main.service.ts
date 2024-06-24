import { Inject, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/req-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SharedService } from 'src/shared/shared.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
  USER_VERSION_KEY,
  USER_TOKEN_KEY,
} from 'src/common/contants/redis.contant';
import { Payload } from './mian.interface';
import { ReqLoginDto } from './dto/req-login.dto';
import { CAPTCHA_IMG_KEY } from 'src/common/contants/redis.contant';
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class LoginService {
  constructor(
    private readonly SharedService: SharedService,
    private readonly JwtService: JwtService,
    @InjectRedis() private redis: Redis,
  ) {}

  /**
   * @description：登录
   */
  async login(ReqLoginDto: ReqLoginDto) {
    const { user } = ReqLoginDto as any;
    const payload: Payload = { userId: user.userId, pv: 1 };
    // 1.生成token （账号密码和token的校验放在jwt验证管道里）
    const token = this.JwtService.sign(payload);
    console.log(token, 'tokentokentoken');
    //2.存储密码版本号，防止登录期间 密码被管理员更改后 还能继续登录
    await this.redis.set(`${USER_VERSION_KEY}:${user.userId}`, 1);
    //3.存储token, 防止重复登录问题，设置token过期时间(1天后 token 自动过期)，以及主动注销token。
    await this.redis.set(
      `${USER_TOKEN_KEY}:${user.userId}`,
      token,
      'EX',
      60 * 60 * 24,
    );
    //4.调用存储在线用户接口
    // await this.logService.addLogininfor(
    //   request,
    //   '登录成功',
    //   `${USER_TOKEN_KEY}:${user.userId}`,
    // );
    return { token: token };
  }

  /**
   * @description: 创建验证码图片
   */
  async createImageCaptcha() {
    const { data, text } = svgCaptcha.createMathExpr({
      // size: 4, //验证码长度
      // ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      // background: '#cc9966', // 验证码图片背景颜色
      width: 115.5,
      height: 38,
    });
    const result = {
      img: data.toString(),
      uuid: this.SharedService.generateUUID(),
    };
    await this.redis.set(
      `${CAPTCHA_IMG_KEY}:${result.uuid}`,
      text,
      'EX',
      60 * 5,
    );
    return result;
  }
}

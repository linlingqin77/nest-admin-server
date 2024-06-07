import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RedisCacheService } from '../redis/redis-cache/redis-cache.service';
import { RedisPrefixToken } from 'src/config/RedisKeyPrefix';
import * as CONST from 'src/config/timeLength';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UserLogin } from 'src/schema/user_login.schema';
import { TOKEN_AUTOMATIC_RENEWAL_IGNORE_LIST } from 'src/config/ApiWhiteList';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLogin } from './entities/user-login.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly AuthService: AuthService,
    private readonly UserService: UserService,
    private readonly RedisCacheService: RedisCacheService,
    @InjectRepository(UserLogin)
    private readonly userLoginRepository: Repository<UserLogin>,
  ) {
    super({
      /**
* 策略中的ExtractJwt提供多种方式从请求中提取JWT，常见的方式有以下几种：
     fromHeader： 在Http 请求头中查找JWT
     fromBodyField: 在请求的Body字段中查找JWT
     fromAuthHeaderAsBearerToken：在授权标头带有Bearer方案中查找JWT
*/

      // jwtFromRequest: ExtractJwt.fromHeader('token'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true, //回调 req，payload
    });
  }

  async validate(req: any, payload: any) {
    console.log(payload, 888888888888888, 'payload');
    // 1.获取到用户传来的token
    const userToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // 2.获取到redis中的token
    const redisTokenKey = `${RedisPrefixToken}${payload.id}`;
    const redisToken = await this.RedisCacheService.cacheGet(redisTokenKey);
    // 3，进行对比 如果不一致或者不存在的情况下的话就抛出异常
    if (!redisToken) {
      throw new UnauthorizedException('token失效');
    }
    if (userToken !== redisToken) {
      throw new UnauthorizedException('用户已经在别处登录');
    }
    // 到这一步的话代表 传的token和是当前登录的token 即redis的token 和登录表一样
    // 4. 重新设置redis中的token 和登录表中的
    // 有请求的话 就自动续期token
    if (!TOKEN_AUTOMATIC_RENEWAL_IGNORE_LIST.includes(req.url)) {
      this.RedisCacheService.cacheSet(
        redisTokenKey,
        userToken,
        CONST.TOKEN_FIRST_SET_TIME,
      );
      const row = await this.userLoginRepository.create({
        user_id: payload.id,
        token: userToken,
        username: payload.username,
      });

      this.userLoginRepository.save(row);
      // this.userLoginRepository.update()
    }

    const existUser = await this.UserService.findOneById(payload.id);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    return existUser;
  }
}

/*
https://docs.nestjs.com/guards#guards
*/

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/api/auth/constants';
import { AuthService } from 'src/api/auth/auth.service';
import { UserService } from 'src/api/user/user.service';
import { RedisCacheService } from 'src/api/redis/redis-cache/redis-cache.service';
import { RedisPrefixToken } from 'src/config/RedisKeyPrefix';
import * as CONST from 'src/config/timeLength';
import { Model } from 'mongoose';
import { TOKEN_AUTOMATIC_RENEWAL_IGNORE_LIST } from 'src/config/ApiWhiteList';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLogin } from 'src/api/auth/entities/user-login.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    console.log(authorization, 'authorization');
    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }
    const payload = await this.jwtService.verifyAsync(authorization, {
      secret: jwtConstants.secret,
    });
    console.log(payload, 'payload');

    return true;
  }
}

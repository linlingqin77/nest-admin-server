import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from 'src/api/auth/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginGuard implements CanActivate {
  // constructor(

  // ) {}
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(Reflector)
  private readonly Reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const requireLogin = this.Reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ]);

    // 如果目标 handler 或者 controller 不包含 require-login 的 metadata，那就放行，否则才检查 jwt。
    if (!requireLogin) {
      return true;
    }
    const authorization = request.headers.authorization;

    // console.log(authorization, 'authorization');

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    // 验证token
    try {
      const token = authorization.split(' ')[1];
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      request.user = payload;

      // console.log(payload, 'payload');

      return true;
    } catch (error) {
      throw new UnauthorizedException('token已过期,登录失效');
    }
  }
}

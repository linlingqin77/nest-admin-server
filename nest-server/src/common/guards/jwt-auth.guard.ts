import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'node_modules/rxjs/dist/types';
import { PUBLIC_KEY } from 'src/common/contants/decorator.contant';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // getHandler 值将覆盖 getClass上面的值
    const noInterception = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (noInterception) return true;
    return super.canActivate(context);
  }

  /* 主动处理错误 */
  handleRequest(err, user, info) {
    console.log(err, 'err');

    if (err || !user) {
      throw err || new ApiException('登录状态已过期', 401);
    }
    return user;
  }
}

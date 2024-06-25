/*
 * @Description: 登录守卫 ，可进行登录日志记录
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiException } from '../exceptions/api.exception';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  context: ExecutionContext;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.context = context;
    return super.canActivate(context);
  }

  /* 主动处理错误,进行日志记录 */
  handleRequest(err, user, info) {
    if (err || !user) {
      const request = this.context.switchToHttp().getRequest();
      request.user = user;
      throw err || new ApiException(err);
    }
    return user;
  }
}

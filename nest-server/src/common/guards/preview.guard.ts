/*
@description: 演示环境守卫
*/

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import configuration from 'src/config/configuration';
import { ApiException } from '../exceptions/api.exception';
import { LogOption } from '../decorators/log.decorator';
import { LOG_KEY_METADATA } from '../contants/decorator.contant';
@Injectable()
export class PreviewGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isOperation = this.reflector.get<LogOption>(
      LOG_KEY_METADATA,
      context.getHandler(),
    );
    if (!isOperation) return true;

    // const operationMethod = ['POST', 'PUT', 'DELETE'];
    const isDemoEnvironment = configuration().isDemoEnvironment;
    // const method = context.switchToHttp().getRequest().method;
    // if (operationMethod.includes(method) && isDemoEnvironment) {
    if (isDemoEnvironment) {
      throw new ApiException('演示环境不允许操作', 200);
    }
    return true;
  }
}

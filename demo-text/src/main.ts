import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as https from 'https';
import * as express from 'express';
// import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from './core/pipe/custom-pipe.pipe';
import { AllExceptionsFilter } from './core/filter/any-exception.filter';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpReqTransformInterceptor } from './core/interceptor/http-req.interceptor';
import * as session from 'express-session';
import APP_CONFIG from './config/configuration';
import { join } from 'path';
// 中间件日志
import { logger } from './core/middleWare/loger.middleware';
import * as fs from 'fs';
async function bootstrap() {
  // 读取SSL证书和私钥文件
  const httpsOptions = {
    key: fs.readFileSync(join(__dirname, '../ssl/privkey.key')),
    cert: fs.readFileSync(join(__dirname, '../ssl/fullchain.pem')),
  };
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  //   cors: true, httpsOptions
  // });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  app.useStaticAssets('public', {
    prefix: APP_CONFIG().UPLOAD_PREFIX,
  });
  app.use(
    session({
      secret: 'XiaoMan',
      name: 'xm.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  // 我们会在main中全局的使用他们
  //日志相关
  app.use(logger); // 所有请求都打印日志  logger
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor()); // 使用全局拦截器 收集日志
  // app.useGlobalInterceptors(new HttpReqTransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(APP_CONFIG().APP_PROT);
}
bootstrap();

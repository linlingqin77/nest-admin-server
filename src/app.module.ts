import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { RoleModule } from './api/role/role.module';
import { PermissionModule } from './api/permission/permission.module';
import { MenuModule } from './api/menu/menu.module';
import { RedisCacheModule } from './api/redis/redis-cache/redis-cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as multer from 'multer';
import { AuthGuard } from './core/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/api/auth/auth.service';
import { UserService } from 'src/api/user/user.service';
import { RedisCacheService } from 'src/api/redis/redis-cache/redis-cache.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '123456', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'vue_nest_blog', //库名
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    AuthModule,
    UserModule,
    RedisCacheModule,
    PermissionModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
    RedisCacheService,
    // AuthService,
    // UserService,
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(multer().any()).forRoutes('*');
  }
}

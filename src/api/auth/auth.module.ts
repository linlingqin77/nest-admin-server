import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './entities/user-login.entity';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { RedisCacheService } from '../redis/redis-cache/redis-cache.service';
import { ToolsCaptcha } from 'src/utils/captcha';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, // 就是成常量里来的
      signOptions: { expiresIn: '8h' }, // token 过期时效
    }),
    TypeOrmModule.forFeature([UserLogin]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, RedisCacheService, ToolsCaptcha, JwtStrategy],
})
export class AuthModule { }

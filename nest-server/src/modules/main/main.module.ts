import { Module } from '@nestjs/common';
import { LoginService } from './main.service';
import { LoginController } from './main.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../system/auth/auth.constants';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}

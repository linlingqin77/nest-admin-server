import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Session,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuard as AuthGuard1 } from 'src/core/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 登录
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Body() userLogin: LoginAuthDto, @Session() session) {
    console.log(userLogin, 'userLogin');

    return this.authService.login({ ...userLogin, codeId: session.codeId });
  }
  // 注册
  @Post('register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    return await this.authService.register(CreateUserDto);
  }
  // 获取验证码
  @Get('code')
  // @UseGuards(AuthGuard1)
  getCode(@Res() res, @Req() req) {
    return this.authService.getCode(res, req);
  }
}

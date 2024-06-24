import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { LoginService } from './main.service';
import { ReqLoginDto } from './dto/req-login.dto';
import { ResLoginDto } from './dto/res-login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
import { ResImageCaptchaDto } from './dto/res-login.dto';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /* 用户登录 */
  @Post()
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Body() ReqLoginDto: ReqLoginDto): Promise<ResLoginDto> {
    return await this.loginService.login(ReqLoginDto);
  }

  /* 获取图片验证码 */
  @Get('captchaImage')
  @Public()
  async captchaImage(): Promise<ResImageCaptchaDto> {
    return await this.loginService.createImageCaptcha();
  }
}

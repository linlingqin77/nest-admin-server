import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SharedService } from 'src/shared/shared.service';
@Injectable()
export class LoginService {
  constructor(private readonly SharedService: SharedService) {}

  create(createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }
  /* 创建验证码图片 */
  async createImageCaptcha() {
    const { data, text } = svgCaptcha.createMathExpr({
      // size: 4, //验证码长度
      // ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      // background: '#cc9966', // 验证码图片背景颜色
      width: 115.5,
      height: 38,
    });
    // const result = {
    //   img: data.toString(),
    //   uuid: this.sharedService.generateUUID(),
    // };
    // await this.redis.set(
    //   `${CAPTCHA_IMG_KEY}:${result.uuid}`,
    //   text,
    //   'EX',
    //   60 * 5,
    // );
    // return result;
  }
}

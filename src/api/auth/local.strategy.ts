import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'nickname',
      passwordField: 'password',
    });
  }

  async validate(nickname: string, password: string): Promise<any> {
    const user = await this.userService.avalidateUser(nickname, password);
    return user;
  }
}

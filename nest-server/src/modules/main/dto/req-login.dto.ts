import { IsNotEmpty } from 'class-validator';

export class CreateLoginDto {}
export class ReqLoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  uuid: string;
  code: string;
}

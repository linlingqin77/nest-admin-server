import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmpty,
} from 'class-validator';
import { User } from '../entities/user.entity';
export class CreateUserDto {
  email: string;
  @IsNotEmpty({
    message: 'nickname is not empty',
  })
  nickname: string;

  phone: string;
  @IsNotEmpty({
    message: 'password is not empty',
  })
  password: string;
  avatar: string;
  intro: string;
  website: string;
  isDisable: boolean;
  is_subscribe: boolean;
  position_id: string;
  department_id: string;

  @IsNotEmpty({
    message: 'roleIds is not empty',
  })
  roleIds: number[];
}

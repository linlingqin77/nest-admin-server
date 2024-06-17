import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmpty,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: 'username is not empty',
  })
  username: string;
  nickname: string;
  email: string;
  phone: string;
  @IsNotEmpty({
    message: 'password is not empty',
  })
  password: string;
  avatar: string;
  notes: string;
  website: string;
  status: string;
  is_subscribe: string;
  position_ids: number[];
  role_ids: number[];
  department_id: string;
  remarks: string;
  sex: string;
  // @IsNotEmpty({
  //   message: 'roleIds is not empty',
  // })
}

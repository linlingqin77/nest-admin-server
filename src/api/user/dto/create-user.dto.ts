import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmpty,
} from 'class-validator';
export class CreateUserDto {
  // @IsNotEmpty({
  //   message: 'code is not empty',
  // })
  // code?: string;

  // id?: number
  // @IsNotEmpty({
  //   message: 'email is not empty',
  // })
  email: string;

  @IsNotEmpty({
    message: 'nickname is not empty',
  })
  nickname: string;

  @IsNotEmpty({
    message: 'password is not empty',
  })
  password: string;

  // @IsNotEmpty({
  //   message: 'avatar is not empty',
  // })
  avatar: string;

  // @IsNotEmpty({
  //   message: 'intro is not empty',
  // })
  intro: string | null;

  // @IsNotEmpty({
  //   message: 'website is not empty',
  // })
  website: string | null;

  // @IsNotEmpty({
  //   message: 'isDisable is not empty',
  // })
  isDisable: boolean;

  // @IsNotEmpty({
  //   message: 'isSubscribe is not empty',
  // })
  isSubscribe: boolean | null;

  @IsNotEmpty({
    message: 'roleIds is not empty',
  })
  roleIds: number[];
}

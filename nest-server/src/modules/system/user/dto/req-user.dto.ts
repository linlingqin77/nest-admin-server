import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  Length,
  IsArray,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
/* 创建用户 DTO*/
export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  deptId?: number;

  @IsOptional()
  @IsEmail()
  @Length(0, 50)
  email: string;

  @IsString()
  @Length(0, 30)
  nickName: string;

  @IsString()
  @Length(0, 30)
  userName: string;

  @IsString()
  @Length(0, 200)
  password: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('CN')
  phonenumber?: string;

  @IsOptional()
  @IsArray()
  postIds?: Array<number>;

  @IsOptional()
  @IsArray()
  roleIds?: Array<number>;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  sex?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @IsOptional()
  @IsNumber()
  postSort?: number;
}

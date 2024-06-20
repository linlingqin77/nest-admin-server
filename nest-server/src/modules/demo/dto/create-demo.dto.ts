import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateDemoDto {
  @IsNotEmpty({ message: '名字不能为空' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '年龄不能为空' })
  @IsNumber()
  age: number;
}

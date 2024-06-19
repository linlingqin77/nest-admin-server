import { PartialType } from '@nestjs/swagger';
import { CreateDepartmentDto } from './create-department.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @IsNotEmpty({ message: 'id不能为空' })
  id?: number;
  @IsNotEmpty({ message: 'parent_id is required' })
  parent_id: number;
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNotEmpty({ message: 'order is required' })
  order: number;
}

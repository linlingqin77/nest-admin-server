import { IsString, IsNotEmpty } from 'class-validator';
import { Department } from '../entities/department.entity';
import { PartialType } from '@nestjs/swagger';
export class CreateDepartmentDto extends PartialType(Department) {
  @IsNotEmpty({ message: 'parent_id is required' })
  parent_id: number;
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNotEmpty({ message: 'order is required' })
  order: number;
}

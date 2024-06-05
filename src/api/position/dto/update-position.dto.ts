import { PartialType } from '@nestjs/swagger';
import { CreatePositionDto } from './create-position.dto';
import { IsNotEmpty } from 'class-validator';
export class UpdatePositionDto extends PartialType(CreatePositionDto) {
  @IsNotEmpty({ message: 'id is required' })
  id?: number;
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;
  @IsNotEmpty({
    message: 'code is required',
  })
  code: string;
  @IsNotEmpty({
    message: 'order is required',
  })
  order: number;
}

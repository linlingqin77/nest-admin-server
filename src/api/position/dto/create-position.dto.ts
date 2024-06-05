import { IsString, IsNotEmpty } from 'class-validator';
import { Position } from '../entities/position.entity';
import { PartialType } from '@nestjs/swagger';
export class CreatePositionDto extends PartialType(Position) {
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

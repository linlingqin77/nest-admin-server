import { PartialType } from '@nestjs/swagger';
import { CreatePositionDto } from './create-position.dto';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {}

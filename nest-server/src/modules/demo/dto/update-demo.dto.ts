import { PartialType } from '@nestjs/swagger';
import { CreateDemoDto } from './create-demo.dto';

export class UpdateDemoDto extends PartialType(CreateDemoDto) {}

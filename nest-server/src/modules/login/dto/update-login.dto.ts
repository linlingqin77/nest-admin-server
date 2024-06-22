import { PartialType } from '@nestjs/swagger';
import { CreateLoginDto } from './create-login.dto';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateRedisCacheDto } from './create-redis-cache.dto';

export class UpdateRedisCacheDto extends PartialType(CreateRedisCacheDto) {}

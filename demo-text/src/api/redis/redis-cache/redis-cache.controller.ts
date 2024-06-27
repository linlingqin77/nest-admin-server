import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { CreateRedisCacheDto } from './dto/create-redis-cache.dto';
import { UpdateRedisCacheDto } from './dto/update-redis-cache.dto';

@Controller('redis-cache')
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) { }

}

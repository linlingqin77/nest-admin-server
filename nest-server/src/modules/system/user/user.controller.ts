import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { User } from './entities/user.entity';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/req-user.dto';
@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
}

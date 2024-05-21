import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequireLogin } from 'src/core/decorator/custom.decorator';
interface IUserList {
  id: string;
  nickname?: string;
  page?: number;
  pageSize?: number;
}

@Controller('user')
@RequireLogin()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/list')
  async findMany(@Body() body: IUserList) {
    return await this.userService.findMany(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOneById(id);
  }
}

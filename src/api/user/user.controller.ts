import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequireLogin } from 'src/core/decorator/custom.decorator';
import { Request } from 'express';

interface IUserList {
  id: string;
  nickname?: string;
  page?: number;
  pageSize?: number;
}
declare module 'express' {
  interface Request {
    user: User;
  }
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

  @Get('/info/:id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOneById(id);
  }

  // 查询用户信息
  @Get('/info')
  async findUserInfo(@Req() req: Request) {
    return await this.userService.findOneById(req.user.id);
  }

 // 获取路由
 @Get('routes')
 async getMenuListByUserId(@Req() req) {
   return await this.userService.getUserRoutes(req.user.id);
 }
}

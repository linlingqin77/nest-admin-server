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
import { ApiException } from 'src/common/exceptions/api.exception';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/req-user.dto';
import { ReqAddUserDto } from './dto/req-user.dto';
@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* 新增用户 */
  @Post()
  async add(@Body() reqAddUserDto: ReqAddUserDto) {
    const user = await this.userService.findOneByUserNameState(
      reqAddUserDto.userName,
    );
    if (user) throw new ApiException('该用户名已存在，请更换');
    return await this.userService.addUser(reqAddUserDto);
  }
}

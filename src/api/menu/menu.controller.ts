import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { RequireLogin } from 'src/core/decorator/custom.decorator';

@RequireLogin()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('add')
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }


  @Get('list')
  async findByParentId(@Query('name') name: string) {
    return await this.menuService.findByParentId(name);
  }

  
}

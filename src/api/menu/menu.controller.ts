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
  Req,
  Put,
  ParseBoolPipe,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { SearchMenuDto } from './dto/search-menu.dto';
import { RequireLogin } from 'src/core/decorator/custom.decorator';

@RequireLogin()
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  // 新增菜单
  @Post('add')
  async create(@Body() createMenuDto: CreateMenuDto) {
    console.log(createMenuDto, 'createMenuDto');

    return await this.menuService.create(createMenuDto);
  }

  // 查询菜单树
  @Get('tree')
  async findMenuTree(@Query() query: SearchMenuDto,) {
    return await this.menuService.findMenuTree(query);
  }
  // 删除菜单
  @Post('delete')
  async removeMenusById(@Query('id', ParseIntPipe) id: number) {
    return await this.menuService.removeMenusById(id);
  }
  // 更新菜单
  @Post('update')
  async updateMenusById(@Body() body: UpdateMenuDto) {
    return await this.menuService.updateMenusById(body);
  }

  @Get('list')
  async findByParentId(@Req() req) {
    return await this.menuService.getMenuListByUserId(req.user.id);
  }

  // 获取路由
  @Get('routes')
  async getMenuListByUserId(@Req() req) {
    return await this.menuService.getMenuListByUserId(req.user.id);
  }
}

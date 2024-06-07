import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SearchRoleDto } from './dto/search-role.dto';

@Controller('/system/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post('add')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('list')
  findList(@Query() SearchRoleDto: SearchRoleDto) {
    return this.roleService.findList(SearchRoleDto);
  }

}

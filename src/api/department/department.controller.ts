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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { query } from 'express';

@Controller('system/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('add')
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get('list')
  findAll(@Query() query: any) {
    return this.departmentService.findAll(query);
  }

  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Post('update')
  update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(updateDepartmentDto);
  }

  @Get('delete/:id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}

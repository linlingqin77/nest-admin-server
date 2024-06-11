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
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('system/position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('add')
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @Get('list')
  findList(@Query() query: any) {
    return this.positionService.findList(query);
  }

  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  @Post(':id')
  update(@Body() updatePositionDto: UpdatePositionDto) {
    return this.positionService.update(updatePositionDto);
  }

  @Get('delete/:id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
}

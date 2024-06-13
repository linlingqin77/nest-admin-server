import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import APP_CONFIG from '../../config/configuration';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file, @Req() req: Request) {
    const data = {
      file,
      name: req.body.name,
      numbers: req.body.numbers,
      image: `http://${APP_CONFIG().APP_HOST}:${APP_CONFIG().APP_PROT}${
        APP_CONFIG().UPLOAD_IMAGE_PREFIX
      }${file.filename}`,
      content: req.body.content,
    };
    return this.orderService.create(data);
  }

  @Get('list')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('image'))
  update(@UploadedFile() file, @Req() req: Request) {
    const data = {
      file,
      name: req.body.name,
      numbers: req.body.numbers,
      image: `http://${APP_CONFIG().APP_HOST}:${APP_CONFIG().APP_PROT}${
        APP_CONFIG().UPLOAD_IMAGE_PREFIX
      }${file.filename}`,
      content: req.body.content,
      id: req.body.id,
    };
    return this.orderService.update(data);
  }

  @Get('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  // @Post('upload')
  // upload(@UploadedFile() file: Express.Multer.File,
  //   @Body() formData: any,
  // ) {
  //   console.log(formData, 'formData');
  //   console.log(file, 'file');

  //   return this.orderService.upload(formData);
  // }
}

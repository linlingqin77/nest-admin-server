import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
@Injectable()
export class OrderService {

  @InjectRepository(Order)
  private readonly orderRepository: Repository<Order>;
  async create(data: CreateOrderDto) {
    const newOrder = this.orderRepository.create()
    newOrder.name = data.name
    newOrder.content = data.content
    newOrder.image = data.image
    newOrder.numbers = data.numbers
    const res = await this.orderRepository.save(newOrder)
    // res.numbers = JSON.parse(res.numbers).map(item => {
    //   return +item
    // })
    return res

  }

  findAll() {
    return this.orderRepository.find()
  }

  findOne(id: string) {
    return this.orderRepository.findOneBy({ id })
  }

  update(updateOrderDto: UpdateOrderDto) {

    const newOrder = this.orderRepository.create()
    newOrder.id = updateOrderDto.id
    newOrder.name = updateOrderDto.name
    newOrder.content = updateOrderDto.content
    newOrder.image = updateOrderDto.image
    newOrder.numbers = updateOrderDto.numbers

    return this.orderRepository.save(newOrder)
  }

  remove(id: string) {
    return this.orderRepository.delete(id)
  }

  // upload(formData){

  // }
}

import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ResultData } from 'src/utils/result';
@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly orderRepository: Repository<Order>;
  async create(data: CreateOrderDto) {
    const newOrder = this.orderRepository.create();
    newOrder.name = data.name;
    newOrder.content = data.content;
    newOrder.image = data.image;
    newOrder.numbers = data.numbers;
    const res = await this.orderRepository.save(newOrder);
    // res.numbers = JSON.parse(res.numbers).map(item => {
    //   return +item
    // })
    return ResultData.ok(res, '新增成功');
  }

  async findAll() {
    const data = await this.orderRepository.find();
    return ResultData.ok(data, '查询成功');
  }

  async findOne(id: string) {
    const data = await this.orderRepository.findOneBy({ id });
    return ResultData.ok(data, '查询成功');
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const newOrder = this.orderRepository.create();
    newOrder.id = updateOrderDto.id;
    newOrder.name = updateOrderDto.name;
    newOrder.content = updateOrderDto.content;
    newOrder.image = updateOrderDto.image;
    newOrder.numbers = updateOrderDto.numbers;

    const data = await this.orderRepository.save(newOrder);
    return ResultData.ok(data, '修改成功');
  }

  async remove(id: string) {
    const data = await this.orderRepository.delete(id);
    return ResultData.ok(data, '删除成功');
  }

  // upload(formData){

  // }
}

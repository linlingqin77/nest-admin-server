import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from './entities/demo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DemoService {
  @InjectRepository(Demo)
  private readonly demoRepository: Repository<Demo>;

  async create(createDemoDto: CreateDemoDto) {
    const demo = new Demo();
    demo.name = createDemoDto.name;
    demo.age = createDemoDto.age;
    return await this.demoRepository.save(createDemoDto);
  }

  async findAll() {
    return await this.demoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}

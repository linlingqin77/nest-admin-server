import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { convertToTree } from 'src/utils/convertToTree';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    return await this.menuRepository.save(createMenuDto);
  }

  async findByParentId(name: string) {
    const menusList = await this.menuRepository.find();
    const menuBuilder = this.menuRepository.createQueryBuilder('menus');
    if (name) {
      menuBuilder
        .select()
        .where('menus.name LIKE :name', { name: `%${name}%` });
    }
    const menus = await menuBuilder.getMany()
    return menus;
    // let children = [];
    // if (!menus) {
    //   return [];
    // }
    // children = convertToTree(menusList, +menus[0].id);
    // return { ...menus, children };
  }
}

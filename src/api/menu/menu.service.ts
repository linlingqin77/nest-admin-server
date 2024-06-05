import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { handleTree } from 'src/utils/convertToTree';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async create(val: CreateMenuDto) {
    const menu = new Menu({
      name: val.name,
      order: val.order,
      parent_id: val.parent_id,
      type: val.type,
      icon: val.icon,
      component: val.component,
      router_path: val.router_path,
      router_params: val.router_params,
      create_by: val.create_by,
      permission: val.permission,
      is_frame: val.is_frame,
      is_cache: val.is_cache,
      visible: val.visible,
      status: val.status,
    });
    return await this.menuRepository.save(menu);
  }

  async findByParentId(name: string) {
    const menusList = await this.menuRepository.find();
    const menuBuilder = this.menuRepository.createQueryBuilder('menus');
    if (name) {
      menuBuilder
        .select()
        .where('menus.name LIKE :name', { name: `%${name}%` });
    }
    const menus = await menuBuilder.getMany();
    return menus;
  }

  async getMenuListByUserId(userId: number) {}

  // 查询菜单树
  async findMenuTree({ name = '', status = '', page = 1, pageSize = 10 }) {
    const QueryBuilder = this.menuRepository.createQueryBuilder('menus');
    if (name) {
      QueryBuilder.where('menus.name LIKE :name', { name: `%${name}%` });
    }
    if (status) {
      QueryBuilder.andWhere('menus.status = :status', { status });
    }
    const menusList = await QueryBuilder.skip((page - 1) * pageSize)
      .take(pageSize)
      .addOrderBy('menus.order', 'ASC')
      .getMany();
    return {
      list: handleTree(menusList, 0, 'parent_id'),
      total: await QueryBuilder.getCount(),
    };
  }
  // 删除
  async removeMenusById(id: number) {
    return await this.menuRepository.delete({ id });
  }
  // 更新
  async updateMenusById(val: UpdateMenuDto) {
    const menu = new Menu({
      id: val.id,
      name: val.name,
      order: val.order,
      parent_id: val.parent_id,
      type: val.type,
      icon: val.icon,
      component: val.component,
      router_path: val.router_path,
      router_params: val.router_params,
      create_by: val.create_by,
      permission: val.permission,
      is_frame: val.is_frame,
      is_cache: val.is_cache,
      visible: val.visible,
      status: val.status,
    });
    return await this.menuRepository.update({ id: menu.id }, menu);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { handleTree } from 'src/utils/convertToTree';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) { }
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
      status: val.status
    })
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
    return menus;;
  }

  // 根据用户id查询菜单
  async getMenuListByUserId(userId: number) {
    const roles = [];
    // 1.根据用户id查找出所属的角色 可能多个
    const user = await this.userRepository.find({
      where: { id: userId },
      relations: ['roles'],
    });

    user[0].roles.forEach((role) => {
      roles.push(role.name);
    });
    // 2.根据角色查询出关联的菜单
    const rolesMenuList = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where('role.name IN (:...roles)', { roles })
      .getMany();

    rolesMenuList.map((item) => {
      return item.menus;
    });

    return rolesMenuList;
    // 3.菜单去重

    // 4.构建前端所需要的权限树
  }

  async findMenuTree({ name = '', status = '' }) {
    // const menusList = await this.menuRepository.find();
    // return handleTree(menusList, 0, 'parent_id');
    const QueryBuilder = this.menuRepository.createQueryBuilder('menus')
    if (name) {
      QueryBuilder.where('menus.name LIKE :name', { name: `%${name}%` })
    }
    if (status) {
      QueryBuilder.andWhere('menus.status = :status', { status })
    }
    const menusList = await QueryBuilder.getMany()
    return handleTree(menusList, 0, 'parent_id');
  }
  // 删除
  async removeMenusById(id: number) {
    await this.menuRepository.delete({ id });
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
      status: val.status
    })
    return await this.menuRepository.update({ id: menu.id }, menu);
  }
}

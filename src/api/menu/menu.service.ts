import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { convertToTree, handleTree } from 'src/utils/convertToTree';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
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
    const menus = await menuBuilder.getMany();
    return menus;
    // let children = [];
    // if (!menus) {
    //   return [];
    // }
    // children = convertToTree(menusList, +menus[0].id);
    // return { ...menus, children };
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

  async findMenuTree() {
    const menusList = await this.menuRepository.find();
    // return convertToTree(menusList, 0);
    return handleTree(menusList, 0, 'parent_id');
  }

  async removeMenusById(id: number) {
    await this.menuRepository.delete({ id });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { handleTree } from 'src/utils/convertToTree';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { ResultData } from 'src/utils/result';
import { In } from 'typeorm';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async create(val: CreateMenuDto) {
    const newMenu = this.menuRepository.create();
    newMenu.id = val.id;
    newMenu.parent_id = val.parent_id;
    newMenu.type = val.type;
    newMenu.icon = val.icon;
    newMenu.name = val.name;
    newMenu.order = val.order;
    newMenu.is_frame = val.is_frame;
    newMenu.router_path = val.router_path;
    newMenu.visible = val.visible;
    newMenu.status = val.status;
    newMenu.component = val.component;
    newMenu.router_params = val.router_params;
    newMenu.create_by = val.create_by;
    newMenu.permission = val.permission;
    newMenu.is_cache = val.is_cache;
    // switch (val.type) {
    //   case '1':
    //     newMenu.component = null;
    //     newMenu.router_params = null;
    //     newMenu.create_by = null;
    //     newMenu.permission = null;
    //     newMenu.is_cache = null;
    //     break;
    //   case '2':
    //     break;
    //   case '3':
    //     newMenu.is_frame = null;
    //     newMenu.router_path = null;
    //     newMenu.visible = null;
    //     newMenu.component = null;
    //     newMenu.router_params = null;
    //     newMenu.create_by = null;
    //     newMenu.is_cache = null;
    //     break;
    //   default:
    //     throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    // }

    const data = await this.menuRepository.save(newMenu);
    return ResultData.ok(data, '添加成功');
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

  // 查询菜单树
  async findMenuTree(parmas) {
    const QueryBuilder = this.menuRepository.createQueryBuilder('menus');
    const { name, status, all = 0, page = 1, pageSize = 10 } = parmas;
    if (name)
      QueryBuilder.andWhere('menus.name LIKE :name', {
        name: `%${name}%`,
      });
    if (status) QueryBuilder.andWhere('menus.status =:status', { status });
    QueryBuilder.addOrderBy('menus.order', 'ASC');
    const [list, total] = all
      ? await QueryBuilder.getManyAndCount()
      : await QueryBuilder.skip((page - 1) * pageSize)
          .take(pageSize)
          .getManyAndCount();

    const data = all
      ? { list: handleTree(list, 'id', 'parent_id'), total }
      : { list: handleTree(list, 'id', 'parent_id'), total, page, pageSize };
    return ResultData.ok(data, '查询成功');
  }
  // 删除
  async removeMenusById(id: number) {
    const data = await this.menuRepository.delete({ id });
    return ResultData.ok(data, '删除成功');
  }
  // 更新
  async updateMenusById(val: UpdateMenuDto) {
    const newMenu = this.menuRepository.create();
    newMenu.id = val.id;
    newMenu.parent_id = val.parent_id;
    newMenu.type = val.type;
    newMenu.icon = val.icon;
    newMenu.name = val.name;
    newMenu.order = val.order;
    newMenu.is_frame = val.is_frame;
    newMenu.router_path = val.router_path;
    newMenu.visible = val.visible;
    newMenu.status = val.status;
    newMenu.component = val.component;
    newMenu.router_params = val.router_params;
    newMenu.create_by = val.create_by;
    newMenu.permission = val.permission;
    newMenu.is_cache = val.is_cache;
    // switch (val.type) {
    //   case '1':
    //     newMenu.component = null;
    //     newMenu.router_params = null;
    //     newMenu.create_by = null;
    //     newMenu.permission = null;
    //     newMenu.is_cache = null;
    //     break;
    //   case '2':
    //     break;
    //   case '3':
    //     newMenu.is_frame = null;
    //     newMenu.router_path = null;
    //     newMenu.visible = null;
    //     newMenu.component = null;
    //     newMenu.router_params = null;
    //     newMenu.create_by = null;
    //     newMenu.is_cache = null;
    //     break;
    //   default:
    //     throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    // }
    // console.log(newMenu, newMenu);

    const data = this.menuRepository.update({ id: val.id }, val);
    return ResultData.ok(data, '修改成功');
  }
}

import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Permission } from '../permission/entities/permission.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) { }
  // 添加角色
  async create(createRoleDto: CreateRoleDto) {
    const { name, permissionIds, menuIds } = createRoleDto;
    const isexist = await this.roleRepository.findOne({
      where: { name },
    });
    if (isexist) throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);

    const menus = await this.menuRepository.find({
      where: { id: In(menuIds) },
    });
    const permissions = await this.permissionRepository.find({
      where: { id: In(permissionIds) },
    });

    return await this.roleRepository.save({
      name,
      permissions,
      menus,
    });
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

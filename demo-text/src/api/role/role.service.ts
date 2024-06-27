import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Permission } from '../permission/entities/permission.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SearchRoleDto } from './dto/search-role.dto';
import { ResultData } from 'src/utils/result';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  // 添加角色
  async create(createRoleDto: CreateRoleDto) {
    const {
      name,
      code,
      order,
      status = '0',
      permission_ids,
      notes,
      menus_ids,
    } = createRoleDto;
    const isexist = await this.roleRepository.findOne({
      where: { name },
    });
    if (isexist) throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);

    const menus = await this.menuRepository.find({
      where: { id: In(menus_ids) },
    });
    // const permissions = await this.permissionRepository.find({
    //   where: { id: In(permission_ids) },
    // });
    const newRole = this.roleRepository.create();
    newRole.name = name;
    newRole.code = code;
    newRole.order = order;
    newRole.status = status;
    newRole.notes = notes;
    newRole.menus = menus;

    const res = await this.roleRepository.save(newRole);
    return ResultData.ok(res, '新增成功');
  }

  // 查询列表分页
  /***
   * @param: all 1:查询所有 0:查询分页 默认为0
   */
  async findList(parmas: SearchRoleDto) {
    const QueryBuilder = this.roleRepository.createQueryBuilder('role');
    QueryBuilder.leftJoinAndSelect('role.menus', 'menus');
    const {
      name,
      code,
      status,
      start_time,
      end_time,
      all = 0,
      page = 1,
      pageSize = 10,
    } = parmas;
    if (name)
      QueryBuilder.andWhere('role.name LIKE :name', { name: `%${name}%` });
    if (code) QueryBuilder.andWhere('role.code =:code', { code });
    if (status) QueryBuilder.andWhere('role.status =:status', { status });
    if (start_time && end_time)
      QueryBuilder.andWhere(
        'role.create_time BETWEEN :start_time AND :end_time',
        { start_time, end_time },
      );
    QueryBuilder.addOrderBy('role.order', 'ASC');
    let [list, total] = all
      ? await QueryBuilder.getManyAndCount()
      : await QueryBuilder.skip((page - 1) * pageSize)
          .take(pageSize)
          .getManyAndCount();
    list.forEach((item) => {
      item['menus_ids'] = item?.menus?.map((item) => item.id);
    });
    const data = all ? { list, total } : { list, total, page, pageSize };
    return ResultData.ok(data, '查询成功');
  }

  /**
   * @Description: 更新角色
   */
  async update(val: CreateRoleDto) {
    const {
      id,
      name,
      code,
      order,
      status = '0',
      permission_ids,
      notes,
      menus_ids,
    } = val;

    const menus = await this.menuRepository.find({
      where: { id: In(menus_ids) },
    });
    // const permissions = await this.permissionRepository.find({
    //   where: { id: In(permission_ids) },
    // });
    const newRole = this.roleRepository.create();
    newRole.id = id;
    newRole.name = name;
    newRole.code = code;
    newRole.order = order;
    newRole.status = status;
    newRole.notes = notes;
    newRole.menus = menus;

    const res = await this.roleRepository.save(newRole);
    return ResultData.ok(res, '更新成功');
  }

  /***
   * @Description: 删除角色
   */
  async delete(id: number) {
    const isexist = await this.roleRepository.findOne({
      where: { id },
    });
    if (!isexist) throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);

    const res = await this.roleRepository.delete(id);
    return ResultData.ok(res, '删除成功');
  }
}

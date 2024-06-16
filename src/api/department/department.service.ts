import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleTree } from 'src/utils/convertToTree';
import { ResultData } from 'src/utils/result';
@Injectable()
export class DepartmentService {
  // constructor(
  //   @InjectRepository(Department) private  readonly departmentRespository:Repository<Department>
  // ){}

  @InjectRepository(Department)
  private readonly departmentRespository: Repository<Department>;

  async create(val: CreateDepartmentDto) {
    const department = this.departmentRespository.create();
    department.parent_id = val.parent_id;
    department.name = val.name;
    department.order = val.order;
    const data = await this.departmentRespository.save(department);

    return ResultData.ok(data, '新增成功');
  }

  async findAll(parmas) {
    // const QueryBuilder =
    //   this.departmentRespository.createQueryBuilder('department');
    // if (name) {
    //   QueryBuilder.where('department.name LIKE :name', { name: `%${name}%` });
    // }
    // if (status) {
    //   QueryBuilder.andWhere('department.status = :status', { status });
    // }
    // const departmentList = await QueryBuilder.skip((page - 1) * pageSize)
    //   .take(pageSize)
    //   .addOrderBy('department.order', 'ASC')
    //   .getMany();

    // return {
    //   list: [{ id: 0, name: "小七科技", children: handleTree(departmentList, 0, 'parent_id') }],
    //   total: await QueryBuilder.getCount(),
    // };

    const QueryBuilder =
      this.departmentRespository.createQueryBuilder('department');
    const { name, status, all = 0, page = 1, pageSize = 10 } = parmas;
    if (name)
      QueryBuilder.andWhere('department.name LIKE :name', {
        name: `%${name}%`,
      });

    if (status) QueryBuilder.andWhere('department.status =:status', { status });
    QueryBuilder.addOrderBy('department.order', 'ASC');
    const [list, total] = all
      ? await QueryBuilder.getManyAndCount()
      : await QueryBuilder.skip((page - 1) * pageSize)
          .take(pageSize)
          .getManyAndCount();
    const data = all
      ? {
          list: handleTree(list, 0, 'parent_id'),
          total,
        }
      : {
          list: handleTree(list, 0, 'parent_id'),
          total,
          page,
          pageSize,
        };
    return ResultData.ok(data, '查询成功');

    // return ResultData.ok(data, '更新成功');
  }

  async findOne(id: number) {
    return await this.departmentRespository.findOneBy({ id });
  }

  async update(val: UpdateDepartmentDto) {
    const department = this.departmentRespository.create();
    department.id = +val.id;
    department.parent_id = val.parent_id;
    department.name = val.name;
    department.order = val.order;
    department.leader = val.leader;
    department.phone = val.phone;
    department.email = val.email;
    department.status = val.status;
    const data = await this.departmentRespository.save(department);
    return ResultData.ok(data, '修改成功');
  }

  async remove(id: number) {
    const data = await this.departmentRespository.delete(id);
    return ResultData.ok(data, '删除成功');
  }
}

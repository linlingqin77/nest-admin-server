import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleTree } from 'src/utils/convertToTree';
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
    return await this.departmentRespository.save(department);
  }

  async findAll({ name = '', status = '', page = 1, pageSize = 10 }) {
    const QueryBuilder =
      this.departmentRespository.createQueryBuilder('department');
    if (name) {
      QueryBuilder.where('department.name LIKE :name', { name: `%${name}%` });
    }
    if (status) {
      QueryBuilder.andWhere('department.status = :status', { status });
    }
    const departmentList = await QueryBuilder.skip((page - 1) * pageSize)
      .take(pageSize)
      .addOrderBy('department.order', 'ASC')
      .getMany();

    return {
      list: handleTree(departmentList, 0, 'parent_id'),
      total: await QueryBuilder.getCount(),
    };
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
    return await this.departmentRespository.save(department);
  }

  async remove(id: number) {
    return await this.departmentRespository.delete(id);
  }
}

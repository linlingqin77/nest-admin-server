import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleTree } from 'src/utils/convertToTree';
import { ResultData } from 'src/utils/result';
@Injectable()
export class PositionService {
  @InjectRepository(Position)
  private readonly positionRespository: Repository<Position>;

  async create(val: CreatePositionDto) {
    const position = this.positionRespository.create();
    position.name = val.name;
    position.code = val.code;
    position.order = val.order;
    position.remark = val.remark;
    const data = await this.positionRespository.save(position);
    return ResultData.ok(data, '添加成功');
  }

  // 查询列表分页
  /***
   * @param: all 1:查询所有 0:查询分页 默认为0
   */
  async findList(parmas) {
    const QueryBuilder =
      this.positionRespository.createQueryBuilder('position');
    const { name, code, status, all = 0, page = 1, pageSize = 10 } = parmas;
    if (name)
      QueryBuilder.andWhere('position.name LIKE :name', {
        name: `%${name}%`,
      });
    if (code) QueryBuilder.andWhere('position.code =:code', { code });
    if (status) QueryBuilder.andWhere('position.status =:status', { status });
    QueryBuilder.addOrderBy('position.order', 'ASC');
    const [list, total] = all
      ? await QueryBuilder.getManyAndCount()
      : await QueryBuilder.skip((page - 1) * pageSize)
          .take(pageSize)
          .getManyAndCount();
    const data = all ? { list, total } : { list, total, page, pageSize };
    return ResultData.ok(data, '查询成功');
  }

  async findOne(id: number) {
    const data = await this.positionRespository.findOneBy({ id });
    return ResultData.ok(data, '查询成功');
  }

  async update(val: UpdatePositionDto) {
    const position = this.positionRespository.create();
    position.id = +val.id;
    position.name = val.name;
    position.order = val.order;
    position.status = val.status;
    const data = await this.positionRespository.save(position);
    return ResultData.ok(data, '更新成功');
  }

  async remove(id: number[]) {
    const data = this.positionRespository.delete(id);
    if (Array.isArray(id)) {
      return ResultData.ok(data, '批量删除成功');
    }
    return ResultData.ok(data, '删除成功');
  }
}

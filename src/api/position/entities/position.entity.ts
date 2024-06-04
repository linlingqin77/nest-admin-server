import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity('t_position')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '岗位名称',
  })
  name: string;
  @Column({
    comment: '岗位编码',
  })
  code: string;
  @Column({
    comment: '岗位顺序',
  })
  order: number;
  //   0正常 1停用
  @Column({
    comment: '岗位状态',
    nullable: true,
    default: () => '0',
  })
  status: string;

  @Column({
    type: 'text',
    comment: 'remark',
    nullable: true,
  })
  remark: string;

  @OneToMany(() => User, (user) => user.position_id)
  users: User[];
}

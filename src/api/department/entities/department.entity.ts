import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity('t_department')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '父部门id',
    nullable: true,
    default: () => 0,
  })
  parent_id: number;
  @Column({
    comment: '部门名称',
    nullable: true,
  })
  name: string;
  @Column({
    comment: '排序',
    nullable: true,
  })
  order: string;
  @Column({
    comment: '部门负责人',
    nullable: true,
  })
  leader: string;
  @Column({
    comment: '部门电话',
    nullable: true,
  })
  phone: string;
  @Column({
    comment: '部门邮箱',
    nullable: true,
  })
  email: string;

  //   0正常 1停用
  @Column({
    comment: '部门状态',
    nullable: true,
    default: () => '0',
  })
  status: string;
  @OneToMany(() => User, (user) => user.department_id)
  users: User[];
}

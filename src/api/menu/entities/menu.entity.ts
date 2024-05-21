import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 20,
    comment: '菜单名称',
  })
  name: string;

  @Column({
    comment: '排序',
    default: 0,
  })
  orderNum: number;

  @Column({ nullable: true, comment: '父id', default: 0 })
  parentId: number;

  @Column({
    length: 10,
    comment: '菜单类型',
    nullable: true,
  })
  menuType: string;

  @Column({
    length: 50,
    nullable: true,
    comment: '菜单图标',
  })
  icon: string;

  @Column({
    length: 50,
    comment: '组件路径',
  })
  component: string;

  @Column({
    length: 50,
    comment: '路由',
  })
  path: string;

  @Column({
    length: 50,
    nullable: true,
  })
  createBy: string;
  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('t_menu')
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
  order_num: number;

  @Column({ nullable: true, comment: '父id', default: 0 })
  parent_id: number;

  @Column({
    length: 10,
    comment: '菜单类型',
    nullable: true,
  })
  menu_type: string;

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
    comment:"创建者"
  })

  create_by: string;
  
  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}

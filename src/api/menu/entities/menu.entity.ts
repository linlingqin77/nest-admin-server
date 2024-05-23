import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('t_menu', { comment: '菜单权限表' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 20, comment: '菜单名称' })
  name: string;

  @Column({ comment: '排序', default: 0 })
  order: number;

  @Column({ nullable: true, comment: '父id', default: 0 })
  parent_id: number;

  @Column({ length: 10, comment: '菜单类型', nullable: true })
  type: string;

  @Column({ length: 50, nullable: true, comment: '菜单图标' })
  icon: string;

  @Column({ length: 50, comment: '组件路径' })
  component: string;

  @Column({ length: 50, comment: '路由' })
  path: string;

  @Column({ length: 50, nullable: true, comment: '创建者' })
  create_by: string;

  @Column({ length: 50, nullable: true, comment: '权限标识' })
  permission: string;

  @Column({ default: '1', comment: '是否为外链' })
  is_frame: string;

  //是否缓存（0是 1否）
  @Column({ default: '0', comment: '是否缓存' })
  is_cache: string;

  //是否显示（0是 1否）
  @Column({ name: 'visible', default: '0', comment: '是否显示' })
  visible: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}

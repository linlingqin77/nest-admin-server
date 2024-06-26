import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('t_menu', { comment: '系统菜单' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, comment: '菜单名称' })
  name: string;

  @Column({ comment: '排序', default: 0 })
  order: number;

  @Column({ nullable: true, comment: '父id', default: 0 })
  parent_id: number;

  //菜单类型（1目录 2菜单 3按钮）
  @Column({ comment: '菜单类型 1目录 2菜单 3按钮', default: '1' })
  type: string;

  @Column({ nullable: true, comment: '菜单图标' })
  icon: string;

  @Column({ comment: '组件路径', nullable: true })
  component: string;

  @Column({ comment: '路由地址', nullable: true })
  router_path: string;

  @Column({ comment: '路由参数', nullable: true })
  router_params: string;

  @Column({ nullable: true, comment: '创建者' })
  create_by: string;

  @Column({ nullable: true, comment: '权限标识' })
  permission: string;

  @Column({ default: '0', comment: '是否为外链', nullable: true })
  is_frame: string;

  //是否缓存（0是 1否）
  @Column({ default: '1', comment: '是否缓存', nullable: true })
  is_cache: string;

  //是否显示（0显示 1隐藏）
  @Column({
    name: 'visible',
    default: '0',
    comment: '是否显示',
    nullable: true,
  })
  visible: string;

  //是否显示（0正常 1停用）
  @Column({ name: 'status', default: '0', comment: '菜单状态', nullable: true })
  status: string;

  @CreateDateColumn({
    transformer: {
      to: (value) => value,
      from: (value) => value.toLocaleString().replace(/\//g, '-'),
    },
  })
  create_time: Date;

  @UpdateDateColumn({
    transformer: {
      to: (value) => value,
      from: (value) => value.toLocaleString().replace(/\//g, '-'),
    },
  })
  update_time: Date;

  constructor(Partial?: Partial<Menu>) {
    Object.assign(this, Partial);
  }
}

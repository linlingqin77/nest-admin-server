// 角色表
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from 'src/api/permission/entities/permission.entity';
import { Menu } from 'src/api/menu/entities/menu.entity';
@Entity('t_role')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({ comment: '权限标识' })
  code: string;

  @Column({ comment: '排序' })
  order: number;

  @Column({
    comment: '状态 0正常 1停用',
    nullable: true,
    default: () => '0',
  })
  status: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation',
  })
  permissions: Permission[];

  @ManyToMany(() => Menu)
  @JoinTable({
    name: 'role_menu_relation',
  })
  menus: Menu[];

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
}

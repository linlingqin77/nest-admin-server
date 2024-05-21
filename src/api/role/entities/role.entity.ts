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

  @Column({
    length: 20,
    comment: '角色名称',
  })
  name: string;

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
    name: 'create_time',
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    name: 'update_time',
    comment: '更新时间',
  })
  update_time: Date;
}

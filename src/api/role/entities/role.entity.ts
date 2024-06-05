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

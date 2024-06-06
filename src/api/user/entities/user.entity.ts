import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  Generated,
} from 'typeorm';
import { Role } from 'src/api/role/entities/role.entity';
import { Department } from 'src/api/department/entities/department.entity';
import { Position } from 'src/api/position/entities/position.entity';
@Entity('t_user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '手机号',
  })
  phone: string;
  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱号',
    length: 50,
  })
  email: string;

  @Column('varchar', { name: 'nickname', comment: '用户昵称', length: 50 })
  nickname: string;

  @Column('varchar', {
    name: 'password',
    comment: '密码',
    length: 255,
    select: false,
  })
  password: string;

  @Column('varchar', {
    name: 'avatar',
    comment: '用户头像',
    length: 1024,
    nullable: true,
  })
  avatar: string;

  @Column('varchar', {
    name: 'intro',
    nullable: true,
    comment: '用户简介',
    length: 255,
  })
  intro: string | null;

  @Column('varchar', {
    name: 'website',
    nullable: true,
    comment: '个人网站',
    length: 255,
  })
  website: string | null;

  @Column({
    name: 'is_disable',
    comment: '是否禁用',
    nullable: true,
    default: () => '0',
  })
  is_disable: string;

  @Column({
    name: 'is_subscribe',
    comment: '是否订阅',
    nullable: true,
    default: () => '0',
  })
  is_subscribe: string;

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

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[]; //角色

  @ManyToOne(() => Department, (Department) => Department.user)
  department: Department;

  @ManyToOne(() => Position, (Position) => Position.users)
  position: Position;
}

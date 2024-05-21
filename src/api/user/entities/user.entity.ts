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
} from 'typeorm';
import { Role } from 'src/api/role/entities/role.entity';
@Entity('t_user', { schema: 'aurora' })
export class User {
  // @PrimaryGeneratedColumn({ type: 'uuid', name: 'id', comment: '用户ID' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱号',
    length: 50,
  })
  email: string | null;

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

  @Column('tinyint', {
    name: 'is_disable',
    comment: '是否禁用',
    width: 1,
    default: () => "'0'",
  })
  isDisable: boolean;

  @Column('tinyint', {
    name: 'is_subscribe',
    nullable: true,
    comment: '是否订阅',
    width: 1,
  })
  is_subscribe: boolean | null;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })

  update_time: Date | null;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[]; //角色
}

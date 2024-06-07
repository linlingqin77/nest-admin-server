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
  OneToOne,
  JoinColumn,
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

  @Column('varchar', { name: 'username', comment: '用户名称', length: 50 })
  username: string;

  @Column('varchar', {
    comment: '用户昵称',
    nullable: true,
  })
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
    name: 'notes',
    nullable: true,
    comment: '备注',
  })
  notes: string;

  @Column({
    nullable: true,
    default: '3',
    comment: '性别 0男 1女 3未知',
  })
  sex: string;

  @Column('varchar', {
    name: 'website',
    nullable: true,
    comment: '个人网站',
    length: 255,
  })
  website: string | null;

  @Column({
    name: 'status',
    comment: '是否禁用',
    nullable: true,
    default: () => '0',
  })
  status: string;

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
  @JoinColumn({ name: 'roles_id' })
  roles: Role[]; //角色

  @ManyToOne(() => Department, (Department) => Department.users)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => Position, (Position) => Position.users)
  position: Position;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('t_user_login', { schema: 'aurora' })
export class UserLogin {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '用户ID' })
  id: number;

  @Column('varchar', {
    name: 'userId',
    comment: '用户ID',
  })
  user_id: number;

  @Column('varchar', {
    name: 'nickname',
  })
  nickname: string;

  @Column('varchar', {
    name: 'token',
    length: 300,
  })
  token: string;

  // @Column('varchar', {
  //   name: 'refreshToken',
  //   // default: () => '',
  // })
  // refreshToken: string;

  @CreateDateColumn({
    name: 'create_time',
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    name: 'update_time',
    comment: '更新时间',
  })
  update_time: Date | null;
}

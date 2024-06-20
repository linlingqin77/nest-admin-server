import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Demo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;
}

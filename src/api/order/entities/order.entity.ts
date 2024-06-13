// 派单表
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
// @Entity('permission')
@Entity('t_order')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true
    })
    name: string;

    @Column({
        nullable: true
    })
    content: string;

    @Column("simple-array")
    // @Column({
    //     type: 'simple-array',
    //     nullable: true,
    // })
    numbers: number[]
    // numbers: string

    @Column({
        length: 10000
    })
    image: string;


    @CreateDateColumn({
        transformer: {
            to: (value) => value,
            from: (value) => new Date(value).toLocaleString().replace(/\//g, '-'),
        },
    })
    create_time: Date;

    @UpdateDateColumn({
        transformer: {
            to: (value) => value,
            from: (value) => new Date(value).toLocaleString().replace(/\//g, '-'),
        },
    })
    update_time: Date;
}

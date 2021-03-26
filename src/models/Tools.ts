import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('tools')
export default class Tools {
    @PrimaryColumn({
        name: 'id',
        type: 'uuid',
        generated: 'uuid',
        default: 'uuid_generate_v4()',
    })
    readonly id: string;

    @Column()
    title: string;

    @Column()
    link: string;

    @Column()
    description: string;

    @Column("simple-array", { array: true })
    tags: string[];

    @CreateDateColumn()
    created_at: Date;
}
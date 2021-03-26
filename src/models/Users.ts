import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import { v4 as uuid } from 'uuid';
@Entity('users')
export default class Users {

    @PrimaryColumn({
        name: 'id',
        type: 'uuid',
        generated: 'uuid',
        default: 'uuid_generate_v4()',
    })
    readonly id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    generateToken() {
        return jwt.sign({ id: this.id }, process.env.APP_SECRET, { expiresIn: '1d' });
    }
}
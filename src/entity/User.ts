import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Messages } from "./Messages";

// ALTER TABLE public.users RENAME COLUMN roleid TO "roleId";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({
        type: "varchar",
        length: 255,
    })
    username: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    avatar: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    uuid: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    status: string;

    @Column({})
    roleId: number;

    @Column({
        type: "varchar",
        length: 255,
    })
    phone: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    email: string;

    @Column({ type: "boolean", default: false })
    two_factor_authentication: boolean;

    @Column({
        type: "varchar",
        length: 255,
    })
    password: string;
    
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        select: false,
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
        select: false,
    })
    updated_at: Date;

    @OneToMany(type => Messages, row => row.receiver, { cascade: ['insert', 'update'] })
    messagesReceived: Messages[];

    @OneToMany(type => Messages, row => row.sender, { cascade: ['insert', 'update'] })
    messagesSent: Messages[];
}

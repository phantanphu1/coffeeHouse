import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./User";
@Entity('messages')
export class Messages {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, user => user.messagesSent)
    // @JoinColumn({ name: "sender_id" })
    sender: Users;

    @ManyToOne(() => Users, user => user.messagesReceived)
    // @JoinColumn({ name: "receiver_id" })
    receiver: Users;

    @Column()
    content: string;

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
}
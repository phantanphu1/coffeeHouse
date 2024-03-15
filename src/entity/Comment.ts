import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number

    @Column({
        type: 'varchar',
        length: 255,
    })
    content: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    like: string;

    @Column()
    productId: number;

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
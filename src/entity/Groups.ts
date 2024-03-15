import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('groups')

export class Groups {
    @PrimaryGeneratedColumn()
    int = Number;

    @Column({
        type: 'varchar',
        length: 256,
    })
    title: string;

    @Column({
        type: "varchar",
        length: 256
    })
    member: string;

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
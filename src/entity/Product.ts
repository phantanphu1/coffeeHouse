import {
    AfterInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    getManager,
} from "typeorm";
import { ProductSize } from "./ProductSize";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 255,
    })
    name_product: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    description: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    brand: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    category: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    color: string;
    @Column({
        type: "varchar",
        length: 255,
    })
    image: string;

    @Column({})
    rating: number;

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

    @OneToMany(type => ProductSize, row => row.product, { cascade: ['insert', 'update'] })
    sizes: ProductSize[];
   
}

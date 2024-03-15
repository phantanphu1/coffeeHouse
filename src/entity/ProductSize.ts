import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
@Entity('product_size')
export class ProductSize {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 255,
    })
    size: string;
    @Column()
    productId: number;
    @Column()
    quantity: number;

    @Column("decimal")
    price: number

    @ManyToOne(() => Product, (product) => product.sizes)
    product: Product;
}
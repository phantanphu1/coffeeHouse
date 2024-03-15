import { Request, Response, NextFunction } from 'express';
import { Repository, getRepository, getTreeRepository } from "typeorm";
import { Product } from "../../../entity/Product";
import { ProductSize } from '../../../entity/ProductSize';

interface QueryParams {
    id?: number
}
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name_product,
            description,
            brand,
            category,
            color,
            image,
            rating,
            sizes, // Mảng chứa thông tin về các size
        } = req.body;

        const productRepo = getRepository(Product);
        const productSizeRepo = getTreeRepository(ProductSize);

        const product = new Product();
        product.name_product = name_product;
        product.description = description;
        product.brand = brand;
        product.category = category;
        product.color = color;
        product.image = image;
        product.rating = rating;

        await productRepo.save(product);
        const id = product.id
        // Lưu trữ thông tin size cho từng size
        for (const size of sizes) {
            const product_size = new ProductSize();
            product_size.productId = id
            product_size.size = size.size; // Giả sử "size" là mảng chứa các đối tượng { size, quantity, price }
            product_size.quantity = size.quantity;
            product_size.price = size.price;
            await productSizeRepo.save(product_size);
        }

        return res.status(200).send({
            status: 'success',
            msg: "you have successfully created a product with multiple sizes.",
        });
    } catch (error) {
        console.log("Create product ", error);
        return res.status(500).send({
            msg: "Get internal server error in create product ",
        });
    }
};
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, id_size } = req.params;
        const {
            name_product,
            price,
            description,
            brand,
            quantity,
            category,
            size,
            color,
            image,
            rating,
        } = req.body;
        const productRepo = getRepository(Product);
        const productSizeRepo = getRepository(ProductSize);

        const product = await productRepo.createQueryBuilder('product')
            .select()
            .where("id=:id", { id })
            .getOne()
        if (!product) {
            return res.status(404).send({
                msg: 'Product not found'
            })
        }

        const products = await productSizeRepo.createQueryBuilder('product_size')
            .select()
            .where("product_size.id=:id_size", { id_size })
            .getOne()
        console.log("vào", products);
        product.name_product = name_product;
        products.price = price;
        product.description = description;
        product.brand = brand;
        products.quantity = quantity;
        product.category = category;
        products.size = size;
        product.color = color;
        product.image = image;
        product.rating = rating;

        const result = productRepo.save(product);
        await productSizeRepo.save(products);
        return res.status(200).send({
            status: 'success',
            msg: "you have successfully.",
            data: result,
        })
    } catch (error) {
        console.log("update product", error);
        return res.status(500).send({
            msg: "Get internal server error in update product"
        })

    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const productRepo = getRepository(Product);
        const product = await productRepo.createQueryBuilder('product')
            .select()
            .where('id = :id', { id })
            .getOne()
        if (!product) {
            return res.status(404).send({
                msg: 'product not found'
            })
        }
        // console.log("vào ",product);
        const PRO = getRepository(ProductSize);
        const products = await PRO.createQueryBuilder('product_size')
            .select()
            // .where('product_size.productId in :id',{ id })
            .getOne()
        console.log("v", products);
        const name = await PRO.delete(products.id)

        const result = productRepo.delete(product.id)
        return res.status(200).send({
            status: 'success',
            msg: "You have successfully",
        })
    } catch (error) {
        console.log("delete product", error);
        return res.status(500).send({
            msg: 'Get Internal server error in delete product'
        })

    }
}
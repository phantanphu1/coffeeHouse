import { Request, Response, NextFunction } from "express";
import { Raw, getRepository } from "typeorm";
import { Product } from "../../entity/Product";

interface QueryParams {
    limit?: number;
    page?: number;
    search?: string;
}
export const getAllProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { limit, page, search } = req.query as QueryParams;
        const searchQuery = search ? `%${search}%` : `%%`; // Handle empty search cases
        const pageNumber = Math.max(1, Number(page || 1)); // Ensure valid page number
        const limitNumber = Math.min(
          Math.max(1, Number(limit || 10)), // Ensure valid limit
          100 // Implement a reasonable limit cap
        );
        const offset = (pageNumber - 1) * limitNumber;
    
        // Optimized query using TypeORM facilities:
        const [products, totalProductCount] = await getRepository(Product)
          .createQueryBuilder("product")
          .leftJoinAndSelect("product.sizes", "productSize") // Eagerly load 
          .where('product.name_product LIKE :searchQuery ', { searchQuery: `%${searchQuery}%` })
          .skip(offset)
          .take(limitNumber)
          .getManyAndCount(); // Efficiently fetch count along with products
    
        res.status(200).send({
          status: "success",
          msg: "You have successfully retrieved products",
          data: products,
          pagination: {
            total: totalProductCount,
            page: pageNumber,
            limit: limitNumber,
          },
        });
    } catch (error) {
        console.log("get all product", error);
        res.status(500).send({
            msg: "Get internal error in get all product",
        });
    }
};

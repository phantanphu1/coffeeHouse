import { Request, Response, NextFunction } from 'express';
import { getRepository } from "typeorm";
import { Users } from "../../../entity/User";
import { Role } from '../../../libs/common/constants';
interface QueryParams {
    limit?: number;
    page?: number;
    search?: string;
}
export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, page, search }: QueryParams = req.query;
        const searchQuery = search ? `%${search}%` : `%%`;
        const pageNumber = page || 1;
        let limitNumber = limit || 10;
        const offset = (pageNumber - 1) * limitNumber;
        const userRepo = getRepository(Users);
        const queryBuilder = await userRepo.createQueryBuilder('users')
            .select()
            .where('users.roleId = :roleId', { roleId: Role.User })
            .andWhere('(username LIKE :searchQuery OR email LIKE :searchQuery )', { searchQuery })
            
        const totalUser = await queryBuilder.getCount();
        const listUser = await queryBuilder.limit(limitNumber).offset(offset).getMany();
        return res.status(200).send({
            status: "success",
            msg: "You have successfully.",
            data: listUser,
            total_users: totalUser
        });

    } catch (error) {
        console.log("get user", error);
        res.status(500).send({
            mes: "Get internal sever error in get all user "
        })

    }
}
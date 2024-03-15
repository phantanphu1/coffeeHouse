import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Users } from "../../entity/User";

export const checkRole = (roles) => {
    try {
        return async (req: Request, res: Response, next: NextFunction) => {
            const userId = (req as any).auth.payload.userId;
            //Get the user ID from previous midleware
            //Get user role from the database
            console.log("V",userId);
            
            let rolesString = roles.join(",");
            console.log('roles: ', rolesString);
            const userRepository = getRepository(Users);
            const _user = await userRepository
                .createQueryBuilder("users")
                .select()
                .where("users.roleId in (:RoleId)", { RoleId: rolesString })
                .andWhere("users.id = :UserId", { UserId: userId })
                .getOne();
            //Check if array of authorized roles includes the user's role
            if (roles.indexOf(_user?.roleId) > -1) next();
            else
                res
                    .status(401)
                    .send({ msg: "You don't have permission to access data." });
        };
    } catch (error) {
        console.log(error); 
    }
};

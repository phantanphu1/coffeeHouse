import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../../entity/User";
import * as bcrypt from 'bcrypt';
import { Role, generateRandomCode, randomNumber, randomString } from "../../libs/common/constants";
import * as jwt from "jsonwebtoken";
import { jwt_config as config } from "../../config";

export const signUpWithEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const userRepo = getRepository(Users)
        const existingEmail = await userRepo.createQueryBuilder('users')
            .select()
            .where("email = :email", { email: email })
            .getOne()
        if (existingEmail) {
            return res.status(400).send({
                msg: "Email war token"
            })
        }
        const salt = await bcrypt.genSalt();
        const newPassword = await bcrypt.hash(password, salt);
        const user = new Users();
        user.email = email;
        user.password = newPassword;
        user.uuid = generateRandomCode(8);
        user.username = randomString(11)
        user.roleId = Role.User;
        await userRepo.save(user)
        res.status(200).send({
            status: 'success',
            mes: "You have successfully sign up with email",
            data: {
                userId: user.id,
                email: user.email
            }
        })
    } catch (error) {
        console.log("singUpWithEmail:", error);
        return res.status(500).send({
            msg: 'Get internal server error in loginWithEmail',
        });
    }
}
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const userRepo = await getRepository(Users)
        const _email = await userRepo.findOne({
            where: { email: email }
        })
        if (!_email) {
            res.status(400).send({
                mes: "This email doesn't exist."
            })
        }
        const getServerPass = _email.password;
        const roleId = _email.roleId
        const id = _email.id
        const checkPassword = bcrypt.compareSync(password, getServerPass);

        if (!checkPassword) {
            return res.status(400).send({
                message: "Invalid password",
            });
        }

        const accessToken = jwt.sign(
            {
                payload: {
                    userId:_email.id,
                    username: _email.username,
                    role: roleId,
                    id: id,
                },
            },
            config.secret,
            {
                algorithm: "HS256",
            }
        );
        res.status(200).json({
            status: "success",
            email,
            roleId,
            accessToken,
        });
    } catch (error) {
        console.log("login", error);
        return res.status(500).send({
            mes: "Get internal server error in login"
        })

    }
}
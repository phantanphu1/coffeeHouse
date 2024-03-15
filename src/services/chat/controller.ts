import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Messages } from "../../entity/Messages";
import { Users } from "../../entity/User";

export const getAllChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sender_id, receiver_id } = req.params
        const chatRepo = getRepository(Messages)
        const queryBuilder = await chatRepo.createQueryBuilder('messages')
            .select()
            .where("messages.senderId= :sender_id", { sender_id })
            .andWhere("messages.receiverId= :receiver_id", { receiver_id })
            .getMany()
        return res.status(200).send({
            status: "success",
            meg: "you have successfully",
            data: queryBuilder
        })
    } catch (error) {
        console.log("get all chat", error);
        res.status(500).send({
            msg: "Get internal error in get all chat"
        })
    }
}

export const addChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sendId, receiverId, content } = req.body;
        const userRepo = await getRepository(Users)
        const chatRepo = await getRepository(Messages)
        const sender = await userRepo.findOne({
            where: { id: sendId }
        })
        const receiver = await userRepo.findOne({
            where: { id: receiverId }
        })

        const message = new Messages();
        message.sender = sender;
        message.receiver = receiver;
        message.content = content;
        await chatRepo.save(message)
        // req.app.io.emit("message", message);
        // req.app.io.to(receiverId.toString()).emit("message", message);
        res.status(200).send({
            status: 'success',
            mes: "You have successfully sign up with email",
            data: {
                sendId: sendId,
                receiverId: receiverId,
                content: content
            }
        })

    } catch (error) {
        console.log("create chat", error);
        res.status(500).send({
            msg: "Get Internal error in create chat"
        })

    }
}
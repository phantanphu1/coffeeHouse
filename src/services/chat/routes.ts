import * as express from "express"
import * as controller from "./controller"
export const chatRouter= express.Router();
chatRouter.route('/get-all-chat/:sender_id/:receiver_id').get(controller.getAllChat) 
chatRouter.route('/add-chat').post(controller.addChat) 
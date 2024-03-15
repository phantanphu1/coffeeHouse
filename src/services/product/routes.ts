import * as express  from "express"
import * as controller from "./controller"
export const productRouter= express.Router();
productRouter.route('/get-all-product').get(controller.getAllProduct)
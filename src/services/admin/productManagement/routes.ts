import * as express from 'express'
import { checkRole } from '../../../libs/middlewares/check-role';
import { Role } from '../../../libs/common/constants';
import * as controller from './controller'
import { jwt_config as config } from "../../../config";
const { expressjwt: jwt } = require('express-jwt');

export const productRouter = express.Router()

// productRouter.route('/create-product').post(jwt(config), checkRole([Role.Admin]), controller.createProduct);
productRouter.route('/create-product').post(controller.createProduct);
// productRouter.route('/update-product/:id').put(jwt(config), checkRole([Role.Admin]), controller.updateProduct);
productRouter.route('/update-product/:id/:id_size').put(controller.updateProduct);
// productRouter.route('/delete/:id').delete(jwt(config), checkRole([Role.Admin]), controller.deleteProduct);
productRouter.route('/delete-product/:id').delete( controller.deleteProduct);

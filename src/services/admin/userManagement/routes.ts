import * as express from 'express';
import * as controller from "./controller"
const { expressjwt: jwt } = require('express-jwt');
import { jwt_config as config, config_not_token } from "../../../config";
import { checkRole } from '../../../libs/middlewares/check-role';
import { Role } from '../../../libs/common/constants';

export const userManagementRouter = express.Router();

// userManagementRouter.route('/get-all-user').get(jwt(config), checkRole([Role.User]), controller.getAllUser);
userManagementRouter.route('/get-all-user').get(controller.getAllUser);
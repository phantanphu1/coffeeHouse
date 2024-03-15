import * as express from 'express';
import * as controller from './controllers';

export const authRouter = express.Router();
authRouter.route('/sign-up-with-email').post(controller.signUpWithEmail)
authRouter.route('/login').post(controller.login)
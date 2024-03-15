import * as express from 'express'
import passport = require('passport');
export const googleRouter = express.Router()
googleRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
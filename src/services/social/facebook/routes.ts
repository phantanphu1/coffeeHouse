import passport = require("passport");
import * as express from "express"
import * as controller from "./controller"
export const googleRouter = express.Router();
googleRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

googleRouter.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
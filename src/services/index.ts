import * as express from "express";
import { authRouter } from "./auth";
import { adminRouters } from "./admin";
import { productRouter } from "./product";
import { chatRouter } from "./chat";
export const services = express.Router();

services.use('/auth', authRouter);
services.use('/product', productRouter);
services.use('/chat', chatRouter);
services.use('/admin',adminRouters);

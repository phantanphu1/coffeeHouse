import express = require("express");
import { userManagementRouter } from "./userManagement/routes";
import { productRouter } from "./productManagement";

export const adminRouters = express.Router()
adminRouters.use('/user-management',userManagementRouter)
adminRouters.use('/product-management',productRouter)

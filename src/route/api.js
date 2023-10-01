import express from 'express';
import apiController from '../controller/apiController'
import userAPIController from '../controller/userAPIController'
import groupController from '../controller/groupController'
import { checkUserJWT,checkUserPermission } from '../middleware/JWTAction'


const route = express.Router();

/**
 * 
 * @param {*} app -- express app
 */
const initAPIRoute = (app) => {

    route.all("*", checkUserJWT, checkUserPermission)
    
    route.post("/register", apiController.handleRegister);
    route.post("/login", apiController.handleLogin)
    route.post("/logout", apiController.handleLogout)
    
    route.get("/account", userAPIController.getUserAccount);
    route.get("/user/read", userAPIController.handleRead);
    route.post("/user/create", userAPIController.handleCreate);
    route.put("/user/update",userAPIController.handleUpdate);
    route.delete("/user/delete", userAPIController.handleDelete);

    route.get("/group/read", groupController.handleRead);

    app.use('/api/v1/',route)
}

export default initAPIRoute;
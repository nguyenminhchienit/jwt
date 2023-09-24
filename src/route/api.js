import express from 'express';
import apiController from '../controller/apiController'
import userAPIController from '../controller/userAPIController'
import groupController from '../controller/groupController'

const route = express.Router();

/**
 * 
 * @param {*} app -- express app
 */
const initAPIRoute = (app) => {

    route.post("/register", apiController.handleRegister);
    route.post("/login", apiController.handleLogin)
    
    route.get("/user/read", userAPIController.handleRead);
    route.post("/user/create", userAPIController.handleCreate);
    route.put("/user/update", userAPIController.handleUpdate);
    route.delete("/user/delete", userAPIController.handleDelete);

    route.get("/group/read", groupController.handleRead);

    app.use('/api/v1/',route)
}

export default initAPIRoute;
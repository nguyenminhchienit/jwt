import express from 'express';
import userController from '../controller/userController'

const route = express.Router();

/**
 * 
 * @param {*} app -- express app
 */
const initWebRoute = (app) => {

    route.get("/",userController.handleHomePage);
    route.get('/user', userController.handleGetUser);
    
    route.post("/create-user", userController.handleCreateUser);

    app.use('/',route)
}

export default initWebRoute;
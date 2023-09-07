import express from 'express';
import userController from '../controller/userController'

const route = express.Router();

/**
 * 
 * @param {*} app -- express app
 */
const initWebRoute = (app) => {

    route.get("/",userController.handleHomePage);
    route.get('/user',userController.handleGetUser);

    app.use('/',route)
}

export default initWebRoute;
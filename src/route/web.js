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
    route.post('/delete-user/:id', userController.handleDeleteUser);
    route.get('/update-user/:id', userController.handleGetUserById);
    route.post('/update-user/:id', userController.handleUpdateUserById);

    app.use('/',route)
}

export default initWebRoute;
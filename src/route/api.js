import express from 'express';
import apiController from '../controller/apiController'

const route = express.Router();

/**
 * 
 * @param {*} app -- express app
 */
const initAPIRoute = (app) => {

    route.post("/register", apiController.handleRegister);
    route.post("/login",apiController.handleLogin)

    app.use('/api/v1/',route)
}

export default initAPIRoute;
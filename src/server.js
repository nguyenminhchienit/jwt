import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoute from './route/web'
import bodyParser from 'body-parser';
import connection from './config/connectDB';

const app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
const PORT = process.env.PORT || 8080


configViewEngine(app);

connection();

initWebRoute(app);

app.listen(PORT, () => {
    console.log("JWT Backend is running on the port "+ PORT);
})
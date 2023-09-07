import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
require('dotenv').config();

const PORT = process.env.PORT || 8080

const app = express();

configViewEngine(app);

initWebRoute(app);

app.listen(PORT, () => {
    console.log("JWT Backend is running on the port "+ PORT);
})
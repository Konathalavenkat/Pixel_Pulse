const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors')
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();

const {authRouter,categoryRouter,fileRouter,postRouter }= require('./routes')
const {errorHandler} = require('./middlewares');

const {notfound} = require('./controllers');

const ConnectMongoDb = require('./init/mongodb');


const app = express();
ConnectMongoDb();

app.use(cors({origin: '*'}))
app.use(express.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({ limit: "500mb",extended: true }));
app.use(morgan("dev"))

//routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/file',fileRouter);
app.use('/api/v1/post', postRouter);

//not found 
app.use('*',notfound);

//error handler middleware
app.use(errorHandler);



module.exports = app;
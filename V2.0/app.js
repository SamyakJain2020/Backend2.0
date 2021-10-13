const express = require('express');
require('dotenv').config({path: './config/config.env'});
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT||8080;

const {sequelize} = require('./models');
//ROUTES
const user = require('./routes/user');
const todo = require('./routes/todo');

const app = express();
//for JWT
app.use(cookieParser());
app.use(cors());

//body parser
app.use(express.urlencoded({extended: false}));-
app.use(express.json());

app.use('/api', user);
app.use('/api', todo);

app.listen(PORT, () => {
    console.log(`Listening at PORT:${PORT}`);
    sequelize.authenticate(); //sync({force:true});
    console.log("DB Connected");
  });
const express = require('express');
require('dotenv').config({path: './config/config.env'});
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT||8080;

const {sequelize} = require('./models');
//ROUTES
const user = require('./routes/user');
const todo = require('./routes/todo');

const app = express();
app.use(express.static(path.join(__dirname, '/public')))
//for JWT
app.use(cookieParser());
app.use(cors());

//body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', user);
app.use('/api', todo);

app.set('view engine','ejs');
// app.set('views', __dirname + '/views');
app.get("/", (req,res,next)=>{
  res.render("register",{message:""});
});

app.get("/user/signin",  (req,res,next)=>{
  res.render("login");
});

// app.get("/user/dashboard",)

app.listen(PORT, () => {
    console.log(`Listening at PORT:${PORT}`);
    sequelize.authenticate();
    console.log("DB Connected"  );
  });
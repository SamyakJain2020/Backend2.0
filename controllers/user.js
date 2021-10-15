const Sequelize = require("sequelize");
const sequelize = require("../models").sequelize;
require("dotenv").config({ path: "./config/config.env" });

// Bring in Model
const User = require("../models/user")(sequelize, Sequelize.DataTypes);
const Todo = require("../models/todo")(sequelize, Sequelize.DataTypes);

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (
    typeof email === "string" &&
    typeof password === "string" &&
    email.length > 0 &&
    password.length >= 8
  ) {
    try {
      const user = await User.create({
        name,
        email,
        password,
      });
      return res.status(200).render("login");
    } catch (err) {
      console.log(`Error while storing to db, ${err}`);
      return res.status(500).render("error", { err });
    }
  } else {
    res.status(401).render("register", { message: "INITAIAL CHECKS FAILED" });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { err });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      //creating a jwt token
      //expires in 30 min
      const token = jwt.sign({ _id: user._id }, "DEVSNEST_HACKATHON", {
        expiresIn: 30 * 60,
        algorithm: "HS256",
      });
      
      res.cookie("token", token);
      res.cookie("uid", user._uid);
      res.set("Authorization", `Bearer ${token}`);
      // view code
      try {
        const uid = req.cookies.uid;
        const userId = uid;
        const user = await User.findOne({ where: { _uid: userId } });
        const todos = await Todo.findAll({
          where: {
            _uid: uid,
          },
        });
        return res.status(200).render("Dashboard", {
          user: user.name,
          uid: user.uid,
          todos: todos,
        });
      } catch (err) {
        console.log(`Error while storing to db, ${err}`);
        return res.status(500).render("error", { err });
      }
      // view code ends
    } else {
      return res.status(401).render("unauthrised");
    }
  } catch (err) {
    console.log(`Error while finding in DB ${err}`);
    res.status(500).render("error", { err });
  }
};

//TODO: need to do more testing
exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).send({
    message: "User logged out successfully",
  });
};

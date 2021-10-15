const Sequelize = require("sequelize");
const sequelize = require("../models").sequelize;
require("dotenv").config({ path: "./config/config.env" });

// Bring in Model
const User = require("../models/user")(sequelize, Sequelize.DataTypes);
const Todo = require("../models/todo")(sequelize, Sequelize.DataTypes);

exports.create = async (req, res) => {

  const { title, desc } = req.body;
  const uid = req.cookies.uid;
  try {
    const todo = await Todo.create({
      title,
      desc,
      _uid: uid,
    });
    //view code start
    try {
      const userId=uid
      const user = await User.findOne({ where: { _uid:userId } });
      const todos = await Todo.findAll({
        where: {
          _uid: uid,
        },
      });
      return res
        .status(200)
        .render("Dashboard", { user: user.name, uid: user.uid, todos: todos });
    } catch (err) {
      console.log(`Error while storing to db, ${err}`);
      return res.status(500).render("error", { err });
    }
    // view code ends

  } catch (err) {
    console.log(`Error while storing to db, ${err}`);
    return res.status(500).render("error", { err });
  }
};

exports.view = async (req, res) => {
  const userId=req.params.uid
  const user = await User.findOne({ where: { _uid:userId } });

 try {
    const todos = await Todo.findAll({where: {
       _uid:userId
    }});
    // console.log();
    // req.uid=user.uid;
    return res.status(200).render('Dashboard',{user:user.name,uid:user.uid,todos:todos});
  } catch (err) {
    console.log(`Error while storing to db, ${err}`);
    return res.status(500).render("error",{err});
  }
};

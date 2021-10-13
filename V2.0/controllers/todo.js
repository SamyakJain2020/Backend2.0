const Sequelize = require('sequelize');
const sequelize = require('../models').sequelize;
require('dotenv').config({path: './config/config.env'});

// Bring in Model
const User = require('../models/user')(sequelize, Sequelize.DataTypes);
const Todo = require('../models/todo')(sequelize, Sequelize.DataTypes);

exports.create = async (req, res) => {
    const {_uid,title,desc} = req.body;
    try {
      const todo = await Todo.create({
        title,
        desc,
        _uid:_uid,
      });
      return res.status(200).send({
        message: "Todo added successfully",
        todo:  todo
      });
    } catch (err) {
      console.log(`Error while storing to db, ${err}`);
      return res.status(500).send({
        err,
      });
    }
  };
  exports.view = async (req, res) => {
   try {
      const todos = await Todo.findAll({include:User});
      return res.status(200).json(todos);
    } catch (err) {
      console.log(`Error while storing to db, ${err}`);
      return res.status(500).send({
        err,
      });
    }
  };
  
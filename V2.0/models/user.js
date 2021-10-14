'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Todo}) {
      // define association here
        // this.hasMany(Todo,{
        //   foreignKey:'_uid'
        // });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  };
  User.init({
    _uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      // primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
     },
     password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    // tableName:'users',
    timestamps:false,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    user._id = uuidv4();
    const salt = await bcrypt.genSalt(9);
    user.password = await bcrypt.hash(user.password, salt);
  });
  
  return User;
};

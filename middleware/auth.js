const Sequelize = require("sequelize");
const sequelize = require("../models").sequelize;
const User = require("../models/user")(sequelize, Sequelize.DataTypes);
const expressJwt = require('express-jwt');
const jwt = require("jsonwebtoken");

exports.isSignedIn = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(403);
      }
      try {
        const data = jwt.verify(token, "DEVSNEST_HACKATHON");
        req.userId = data.id;
        next();
      } catch {
        return res.sendStatus(403);
      }
    // return [
    //     expressJwt({
    //         secret: "DEVSNEST_HACKATHON",
    //         userProperty: 'auth',
    //         algorithms:['HS256']
    //     })
    //     ,function(err, req, res, next) {
    //         if(err) {
    //             return res.status(401).render("unauthrised");
    //         }
    //         next();
    //     }
    // ]
};

exports.isAuthenticated = async (req, res, next) => {
    const _id = req.auth && req.auth._id;
    if(_id) {
        try{
            const user = await User.findOne({where: {_id}})
            if(user) {
                next();
            }
        } catch(err) {
            console.log(`User not found : ${err.name}`);
        }
    }
};
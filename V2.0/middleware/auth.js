const expressJwt = require('express-jwt');
const User = require('../models/user');
exports.isSignedIn = () => {
    return [
        expressJwt({
            secret: "DEVSNEST_HACKATHON",
            userProperty: 'auth',
            algorithms:['HS256']
        })
        ,function(err, req, res, next) {
            if(err) {
                return res.status(402).send({
                    message: 'Unauthorized'               
                });
            }
            next();
        }
    ]
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
            console.log(`Error occured ${err.name}`);
        }
    }
};
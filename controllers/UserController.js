const User = require('../models/index').User;
const UserRepository = require('../repository/UserRepository');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const signUp = async  (req,res,next) =>{
    // create user 
    UserRepository.createUser(req.body).then(result=>{
        if (result.success) {
            res.send({
                result
            })
        }
        else{
            console.log(result);
            res.status(422).send({
                result
            });
        }
    }).catch(err=>{
        res.status(422).send({
            err
        });
    });
};

const login = async(req,res,next)=>{
    const userData = await UserRepository.checkCredentials(req.body).then(user=>{
        return user;
    }).catch(err=>{
        console.log(err);
    });
    if (userData.success) {
        let payload = {email: userData.email};
        let accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: config.ACCESS_TOKEN_LIFE
        });
        let refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: config.REFRESH_TOKEN_LIFE
        })
        await UserRepository.updateUser({email:userData.email},{refreshToken:refreshToken}).then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        })
        res.send({
            token:accessToken
        })
    } else {
        res.send({
            result:{
                userData
            }
        },401)
    }

}
module.exports = {
    signUp,
    login
}

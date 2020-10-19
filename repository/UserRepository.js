const User = require('../models/index').User;
const logger = require("../logger/logger").Logger;
const bcrypt = require("bcryptjs");

const getAll = async function(attributes){
    const usercount = await User.findAll({where:attributes});
    return usercount;
}
const getOne = async (attributes) =>{
    const user = await User.findOne({where:attributes});
    return user;
}
const createUser = async (attributes)=>{
    const data = {};
    data.name = attributes.name?attributes.name:null;
    data.mobile = attributes.mobile?attributes.mobile:null;
    data.email = attributes.email?attributes.email:null;
    data.password = attributes.password;
    data.otp = Math.floor(1000 + Math.random() * 9000);
    try {
        result = await User.create(data).then(result=>{
            result = {success:true,...result.dataValues};
            return result;
        }).catch(err=>{
            var [message] = err.errors;
            var {message,path,type} = message;
            err = {
                success:false,
                msg:message,
                field:path,
                type:type
            };
            return err;
        });
        logger.info('New User Created','UserRepository.js');
        return result;
    } catch (error) {
        logger.error('User create Error','UserRepository.js')
    }
}
const checkCredentials = async (attributes)=>{
    var plainpassword = attributes.password;
    delete attributes.password;
    data = await getOne(attributes).then(result=>{
        logger.info('User fetched','UserRepository.js at checkCredentials');
        return result;
    }).catch(err=>{
        logger.error('User fetched Error','UserRepository.js at checkCredentials')
        console.log(err);
    });
    if (data !== null) {
        compareResult = await bcrypt.compareSync(plainpassword,data.dataValues.password);
        if(compareResult)
        {
            data.dataValues.success = true;
            return data.dataValues;
        }
        else
        data = {
            success:false,
            message:"wrong credentials."
        }
    } else {
        data = {
            success:false,
            message:"User not found."
        }

    }
    console.log(data);
    return data;
}
const updateUser = async (where,attributes)=>{
    await getOne(where).then(result=>{
        logger.info('User fetched','UserRepository.js at checkCredentials');
        result.update(attributes);
        return result;
    }).catch(err=>{
        logger.error('User fetched Error','UserRepository.js at checkCredentials')
        console.log(err);
    });
}
const UserRepository = {
    getAll,
    getOne,
    createUser,
    checkCredentials,
    updateUser
}

module.exports = UserRepository;
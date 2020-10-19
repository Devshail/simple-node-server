const Vehicle = require('../models/index').Vehicle;
const registerVehicle = async function (req,res,next) {
    Vehicle.create({ 
        name: req.body.name,
        mobile:req.body.mobile
    }).then(result=>{
        res.send({
            result
        })
    }).catch(function(errors) {
        var [msg,mobile,type] = errors.errors
        console.log(msg,mobile,type);
        res.status(422).send({
            msg:msg.message,
            mobile:mobile,
            type:type
        })
    })
};

module.exports = {
    signUp
}

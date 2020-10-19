const { Validator } = require('node-input-validator');
const loginRule = require('./Rules').loginRule;
const validateLogin = async (req,res,next) => {
    v = new Validator(req.body,loginRule);
    const matched = await v.check();
    if (!matched) {
        errors = v.errors
        res.send({
            errors
        },422);
        return;
    }
    var requiredData = {};
    Object.keys(loginRule).map(key => {
        requiredData[key] = req.body[key];
    });
    req.body = {};
    req.body = requiredData;
    next();
}

module.exports = {
    validateLogin
};
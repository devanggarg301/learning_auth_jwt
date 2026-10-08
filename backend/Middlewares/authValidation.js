const joi = require("joi");

const registerValidation = (req,res,next)=>{
    const schema = joi.object({
        username:joi.string().min(3).required(),
        email:joi.string().email().required(),
        password:joi.string().min(3).required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad Request",error:error.details[0].message})
    }
    next();
}

const loginValidation = (req,res,next)=>{
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(3).required()
    });
    
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad Request",error:error.details[0].message})
    }
    next();
}

module.exports = {registerValidation,loginValidation};
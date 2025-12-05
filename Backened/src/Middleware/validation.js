const joi=require('joi');

const signUpValidation=(req,res,next)=>{
    //first we will make the schema for validating the data recieved
    const Schema=joi.object({
        name:joi.string().min(3).required().max(100),
        email:joi.string().min(3).required().email(),
        password:joi.string().min(4).required().max(100),
    });
    const {error}=Schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message:"bad request",error})
    }
    next();

}

const logInValidation=(req,res,next)=>{
    //first we will make the schema for validating the data recieved
    const Schema=joi.object({
        email:joi.string().min(3).required().email(),
        password:joi.string().min(4).required().max(100),
    });
    const {error}=Schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message:"bad request",error})
    }
    next();

}


module.exports={
    signUpValidation,
    logInValidation
}
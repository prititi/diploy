const jwt= require("jsonwebtoken")
const {Blacklist}= require("../config/Blacklist");
const { UserModel } = require("../model/user.model");

const authentication= async(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1];

    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).send('Token is blacklisted');
    }


    if(!token){
        res.send("login again")
    }
    if(token){
        jwt.verify(token,"SECRET",async(err,decode)=>{
            if(decode){
                req.body.userID= decode.userID;
                const userData= await UserModel.findById({_id:decode.userID})
                req.user= userData
                if(!userData){
                    return res.status(401).json({"err":"Unauthorized"})
                }
                next()
            }else{
                res.send({"msg":"Please login"})
            }
        })
    }else{
        res.send({"msg":"Please login","error":err.message})
    }
}

module.exports= {
    authentication
}
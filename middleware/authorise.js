
const authorise= (permissionRole)=>{
    return (req,res,next)=>{

        const user_role= req.user.role
        if(permissionRole.includes(user_role)){
            next()
        }else{
            res.send("unauthorized")
        }
    }
}

module.exports={
    authorise
}
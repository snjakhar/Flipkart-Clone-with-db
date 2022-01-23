const jwt=require("jsonwebtoken")

require("dotenv").config()

const verifyToken=(token)=>{

    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if(err)
            return reject(err)

            resolve(decoded)
          });
    })
}

module.exports=async (req,res,next)=>{

    
    if(!req?.headers?.authorization)
    return res.status(400).send({message:"please provide a valid authorization token"})

    const bearerToken=req.headers.authorization

    if(!bearerToken.startsWith("Bearer "))
    return res.status(400).send({message:"please provide a valid authorization token"})

    const token=bearerToken.split(" ")[1]
console.log(token)
    let user
    try{
     user=await verifyToken(token)
    }catch(err){
        return res.status(401).send({message:"the token is not valid"})
    }
    req.user=user

    next()
}
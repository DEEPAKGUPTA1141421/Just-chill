const jwt=require('jsonwebtoken');
const generateToken=(id)=>{
    const secret_key="deepakgupta";
    return jwt.sign({id},
          secret_key,{
            expiresIn:"3d"
          }
        )
}
module.exports=generateToken;
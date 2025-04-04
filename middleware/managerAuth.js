import jwt from 'jsonwebtoken'

const managerAuth = async (req,res,next) =>{
    const {managerToken} = req.headers
    if(!managerToken){
        return res.status(401).json({message:"Manager is not Authorized !"})
    }

    try{
        const decoded_token = jwt.verify(managerToken,'managerSecretKey')
        req.body.userId = decoded_token.id
        next()
    }
    catch(error){
        console.log("Error in managerAuth Middleware !");
        return res.status(403).json({message:"Invalid Manager Token !"})
    }
}
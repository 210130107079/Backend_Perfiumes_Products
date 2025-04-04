import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"Admin is not Authorized !"})
    }
    try
    {
        const decode_token = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode_token.username
        return next()
    }
    catch(error)
    {
        res.status(401).json({message:"Invalid admin Token Provided !"})
        console.log("Error in adminAuth Middleware !",error)
    }
}

export default userAuth
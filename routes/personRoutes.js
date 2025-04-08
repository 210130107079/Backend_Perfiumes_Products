import express from 'express'
import jwt from 'jsonwebtoken'

const users = {
    admin: { username: "admin", password: "admin9898", role: "admin" },
    manager: { username: "manager", password: "manager9898", role: "manager" }
};

const router = express.Router()

router.post('/login', (req,res)=> {    
    const { username, password } = req.body;
    try 
    {
        if (!username || !password) {
            return res.status(400).json({success:true,message: "Username and password are required!" });
        }
        const user = users[username];
        if (!user || user.password !== password) {
            return res.status(401).json({success:true,message: "Invalid Username or Password!" })
        }

        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.cookie('token', token, { httpOnly: true, secure: true });

        return res.status(200).json({success:true ,token, role: user.role, username, message: "Login successful" })
    } 
    catch (error) 
    {
        console.error("Error during login:", error);
        return res.status(500).json({success:false,error:error.message,message: "Internal server error" });
    }
})

router.post('/logout',(req,res)=>{
    try
    {
        if(!req.cookies.token){
            return res.status(400).json({success:true,message:"User Already Logged Out !"})
        }else{
            res.clearCookie('token')
            return res.status(200).json({success:true,message: "Logout successful"})
        }
    }
    catch(error)
    {
        console.error("Error during logout", error)
        return res.status(500).json({success:false,error:error.message,message:"Error in personRoutes logout"})
    }
})

export default router
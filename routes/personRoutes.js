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
            return res.status(400).json({ message: "Username and password are required!" });
        }
        const user = users[username];
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid Username or Password!" });
        }

        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.cookie('token', token, { httpOnly: true, secure: true });

        return res.status(200).json({ token, role: user.role, username, message: "Login successful" });
    } 
    catch (error) 
    {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/logout',(req,res)=>{
    try
    {
        if(!res.cookie.token){
            return res.status(400).json({message:"User Already Logged Out !"})
        }else{
            res.clearCookie('token')
            return res.status(200).json({message: "Logout successful"})
        }
    }
    catch(error)
    {
        console.error("Error during logout", error)
        return res.status(500).json({message:"Error in personRoutes logout"})
    }
})

export default router
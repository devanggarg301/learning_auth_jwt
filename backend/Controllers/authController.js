const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async(req,res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newUser = new User({username, email, password: hashedpassword});
        await newUser.save();
        res.status(201).json({message: "User registered successfully"
        })
    }
    catch (error) {
        console.error(error.message);

        if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Username or email already exists"
        });
        }

        res.status(500).send("Server Error");
    }
};

const loginUser = async(req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Does not exist"});
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const jwtToken = jwt.sign(
            {email:user.email, _id:user._id, username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.cookie("token",jwtToken,{httpOnly:true});


        res.status(200).json({
            message:"Login Successful",
            success:true,
            jwtToken,
            email,
            username:user.username
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

const logoutUser = (req,res)=>{
    try{
        res.clearCookie('token',{
        httpOnly:true
        });

        res.status(200).json({
            message:"Logout Successful",
            success:true
        });
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

const getCurrentUser = (req,res)=>{
    try{
        const user = req.user;
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json({
            message:"Current User retrieved successfully",
            success:true,
            user
        });
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

module.exports = { registerUser, loginUser,logoutUser,getCurrentUser };

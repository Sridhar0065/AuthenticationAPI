const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/user.js');
const sendCookie = require('../utils/sendCookie.js');
const { ErrorClass } = require("../utils/errorMiddleware.js");

const register = async (req,res,next)=>{
    const {name , email,password} = req.body;//same as const name = req.body.name ......

    let user = await User.findOne({email});
    if(user)
    {
        return next(new ErrorClass("USER ALREADY EXISTS",400))
    }

    const encryptedPassword = await bcrypt.hash(password,10);
    user = await User.create({
        name : name,
        email : email,
        password : encryptedPassword
    })
    // //this sendCookie can be written in seperate file and can be called here as it will also be used in login...
    // const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    // res.status(201).cookie("token",token).json({
    //     success : "true",
    //     message : "USER CREATED SUCCESSFULLY!!"
    // })
    sendCookie(res,user,201,"USER CREATED SUCCESSFULLY!!")
}

const login = async (req,res,next)=>{
    const {email,password} = req.body;//same as const name = req.body.name ......

    let user = await User.findOne({email});
    if(!user)
    {
        return next(new ErrorClass("USER DOES NOT EXIST",400))
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return next(new ErrorClass("INCORRECT PASSWORD",400))    
    }
    sendCookie(res,user,200,"LOGIN SUCCESSFUL!!")
    // //this sendCookie can be written in seperate file and can be called here as it will also be used in register...
    // const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    // res.status(200).cookie("token",token).json({
    //     success : "true",
    //     message : `LOGIN SUCCESSFUL!!`
    // })

}

const logout = async (req,res,next)=>{

    //this checks whether user is loged in or not based on cookies and can be done in seperate file as it will be used in other places...
    // const {token} = req.cookies;
    // if(!token)
    // {
    //     return res.status(404).json({
    //         success : false,
    //         message : "LOGIN FIRST!!"
    //     })
    // }
    // const decoded = jwt.verify(token,"sridhar");
    // req.user = User.findById(decoded);
    res.status(200).cookie("token","",{
        expires : new Date(Date.now())
    }).json({
        success : "true",
        message : `LOGOUT SUCCESSFUL!!`
    })
}
const details = async (req,res,next)=>{

    //this checks whether user is loged in or not based on cookies and can be done in seperate file as it will be used in other places...
    // const {token} = req.cookies;
    // if(!token)
    // {
    //     return res.status(404).json({
    //         success : false,
    //         message : "LOGIN FIRST!!"
    //     })
    // }
    // const decoded = jwt.verify(token,"sridhar");
    // req.user = User.findById(decoded);
    let user = await User.findById(req.user._id)
    
    if(!user)
    {
        return next(new ErrorClass("USER DOES NOT EXIST",400))
    }
    res.status(200).json({
        success : "true",
        user
    })
}

module.exports={
    register:register,
    login:login,
    logout:logout,
    details:details
}
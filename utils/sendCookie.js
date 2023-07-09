const jwt = require("jsonwebtoken")

const sendCookie = (res,user,statusaCode,message) => {
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(statusaCode).cookie("token",token,{
        httpOnly : true,
        maxAge : 15*60*1000
    }).json({
        success : "true",
        message 
    })
}

module.exports = sendCookie
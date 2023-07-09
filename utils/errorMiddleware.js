class ErrorClass extends Error{
    constructor(errMsg,statusCode)
    {
        super(errMsg);
        this.statusCode = statusCode
    }
}
const errorHandler = (err,req,res,next) => {
    err.message = err.message || "INTERNAL SERVER ERROR"
    err.statusCode = err.statusCode || 500
    return res.status(err.statusCode).json({
       success:false,
       message : err.message
   })
}

module.exports = {
    errorHandler:errorHandler,
    ErrorClass : ErrorClass
}
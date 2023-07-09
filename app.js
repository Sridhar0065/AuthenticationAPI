const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const userRoutes=require("./routes/user.js");
const taskRoutes=require("./routes/task.js");
const connectDb = require('./data/database.js');
const {errorHandler} = require("./utils/errorMiddleware.js");

dotenv.config({
    path:"./data/config.env",
})

const app = express();

// mongoose.connect("mongodb://localhost:27017",{
//     dbName : "TODO"
// }).then(()=>{
//     console.log("connected to db");
// })
// .catch(err=>{
//     console.log(err);
// })
//written in seperate file and called here
connectDb();

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/tasks",taskRoutes);

app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log("WORKING!!");
})
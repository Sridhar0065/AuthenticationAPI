const Task =require("../models/task.js");
const {ErrorClass}=require("../utils/errorMiddleware.js")

const newTask = async (req,res,next)=>{
    const {title,description} = req.body;
    const task = await Task.create({
        title :title,
        description : description,
        user : req.user,
    })
    res.status(201).json({
        success : true,
        message : "TASK CREATED SUCCESSFULLY!!",
    })
}

const myTasks = async (req,res,next) => {
    const tasks =await Task.find({user : req.user._id});
    res.status(200).json({
        success : true,
        tasks
    })
}

const updateTask = async (req,res,next)=>{
    let task=await Task.findById(req.params.id);
    if(!task)
    {   
        return next(new ErrorClass("NO SUCH TASK EXISTS",404))
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        success:true,
        message : "TASK UPDATED SUCCESSFULLY"
    })
}


const deleteTask = async (req,res,next)=>{
    let task=await Task.findById(req.params.id);
    if(!task)
    {
        return next(new ErrorClass("NO SUCH TASK EXISTS",404))
    }
    await task.deleteOne();
    res.status(200).json({
        success:true,
        message : "TASK DELETED SUCCESSFULLY"
    })
}


module.exports = {
    newTask : newTask,
    myTasks : myTasks,
    updateTask : updateTask,
    deleteTask:deleteTask
}
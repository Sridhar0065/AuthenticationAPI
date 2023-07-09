const mongoose = require("mongoose");

const connectDb=()=>{mongoose.connect(process.env.MONGO_URI,{
    dbName : "TODO"
}).then(()=>{
    console.log("connected to db");
})
.catch(err=>{
    console.log(err);
})
}

module.exports = connectDb;
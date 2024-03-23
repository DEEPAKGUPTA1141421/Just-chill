const mongoose=require('mongoose');
const connectDatabase=()=>{
    const DB='mongodb+srv://deepak2198be21:CYdBKb4Sq4bUfyG2@cluster0.pcra6pi.mongodb.net/chatApp';
mongoose.connect(DB).then(()=>{
    console.log("connection successful with DB");
}).catch((err)=>console.log("connection unsuccessfull with DB"));
}
module.exports=connectDatabase;
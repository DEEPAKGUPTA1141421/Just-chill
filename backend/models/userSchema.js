const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://img.freepik.com/premium-vector/social-media-user-profile-icon-video-call-screen_97886-10046.jpg"
    }
},
{timestamps:true}
);
userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});
userSchema.methods.matchPassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}
const User=mongoose.model('User',userSchema);
module.exports=User;
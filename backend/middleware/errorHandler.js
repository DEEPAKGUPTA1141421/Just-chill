module.exports.notFound=async(req,res,next)=>{
    const error=new Error (`${req.originalUrl} Not Found`);
    res.status(404).json({
        message:"this url is not found",
        success:false
    });
    next();
}
module.exports.errorHandler=async(err,req,res,next)=>{
    console.log("in error handler");
    const developmentenvirment="production";
    const stausCode=res.stausCode==200?500:res.stausCode;
    res.status(stausCode);
    res.json({
        message:err.message,
        stack:developmentenvirment==="production"?null:err.stack
    })
}
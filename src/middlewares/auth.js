const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(404).send("unAuthorized request");
    } else{
        next();
    }

};

const userAuth=(req,res,next)=>{
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(404).send("unAuthorized request");
    } else{
        next();
    }

};

module.exports = {
    adminAuth,
    userAuth,    
};
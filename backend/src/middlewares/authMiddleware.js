const jwt=require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader)
    {
        return res.status(401).json({message:"No token provided"});
    }
    const token=authHeader.split(" ")[1];

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err)
    {
        return res.status(403).json({message:"Inavlid token"});
    }
};

const authorize=(roles)=>(req,res,next)=>{
    if(!roles.includes(req.user.role))
    {
        return res.status(403).json({message:"Access denied"});
    }
    next();
};

module.exports={authenticate,authorize};
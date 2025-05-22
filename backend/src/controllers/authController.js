const brcytpt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {AppDataSource}=require("../config/datasource");
const userRepo=AppDataSource.getRepository("User");

const signup=async(req,res)=>{
    try{
        const {username,password,role}=req.body;

        const existingUser=await userRepo.findOneBy({username});
        if(existingUser)
        {
            return res.status(400).json({message:"User already exists"});

           
        }
        const hashedPassword=await brcytpt.hash(password,10);
        const user=userRepo.create({username,password:hashedPassword,role:role|| "Employee"});
        await userRepo.save(user);

        res.status(201).json({message:"User created Successfully"});
    }
    catch(err)
    {
        res.status(500).json({message:"Signup Failed",error:err.message});
    }
};


const login=async(req,res)=>{
    try{
        const {username,password}=req.body;


        const user=await userRepo.findOneBy({username});
        if(!user)
        {
            return res.status(404).json({message:"User not found"});
        }
        const isMathch=await brcytpt.compare(password,user.password);
        if(!isMathch)
        {
            return res.status(401).json({message:"Invallid credentials"});
        }
        const token=jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{ 
            expiresIn:"1h",
        });
        res.json({token,role:user.role});
    }
    catch(err)
    {
        res.status(500).json({message:"Login failed",error:err.message});
    }
};


module.exports={signup,login};
const { AppDataSource } = require("../config/datasource");
const requestRepo = AppDataSource.getRepository("Request");
const userRepo = AppDataSource.getRepository("User");
const softwareRepo = AppDataSource.getRepository("Software");

const submitRequest = async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;

    const software = await softwareRepo.findOneBy({ id: softwareId });
    if (!software) return res.status(404).json({ message: "Software not found" });

    const user = await userRepo.findOneBy({ id: req.user.id });
    if (!user) return res.status(404).json({ message: "User not found" });

    const request = requestRepo.create({
      user,
      software,
      accessType,
      reason,
      status: "Pending"
    });

    await requestRepo.save(request);
    res.status(201).json({ message: "Access request submitted", request });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit request", error: err.message });
  }
};


const handleApproval=async(req,res)=>{
  try{
    const requestId=parseInt(req.params.id);
    const{status}=req.body;

    if(!["Approved", "Rejected"].includes(status)){
      return res.status(400).json({message:"Invalid status value"});
    }
    const request=await requestRepo.findOneBy({id:requestId});
    if(!request)
    {
      return res.status(404).json({message:"Request not found"});
    }
    request.status=status;
    await requestRepo.save(request);

    res.json({message:`Request ${status.toLowerCase()}`,request});
  }
  catch(err)
  {
    res.status(500).json({message:"Approval failed",error:err.message});
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await requestRepo.find({ relations: ["user", "software"] });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err.message });
  }
};


module.exports = { submitRequest, handleApproval,getAllRequests};

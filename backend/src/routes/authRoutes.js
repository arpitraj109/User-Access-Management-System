const exprees=require("express");

const router=exprees.Router();
const {signup,login}=require("../controllers/authController");

router.post("/signup",signup);
router.post("/login",login);

module.exports=router;

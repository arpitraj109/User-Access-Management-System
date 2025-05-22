const express = require("express");
const router = express.Router();
const { createSoftware,getAllSoftware } = require("../controllers/softwareController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post("/", authenticate, authorize(["Admin"]), createSoftware);
router.get("/",authenticate,getAllSoftware);

module.exports = router;

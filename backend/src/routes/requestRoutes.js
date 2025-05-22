const express = require("express");
const router = express.Router();
const { submitRequest,handleApproval,getAllRequests } = require("../controllers/requestController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post("/", authenticate, authorize(["Employee"]), submitRequest);

router.patch("/:id",authenticate,authorize(["Manager"]),handleApproval);

router.get("/", authenticate, authorize(["Manager"]), getAllRequests);


module.exports = router;

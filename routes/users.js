var express = require("express");
var router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/usercontroller");


/// USER ROUTES ///

// GET request for one User.
router.get("/:id", user_controller.user_detail);
router.get("/login", user_controller.user_login);

module.exports = router;





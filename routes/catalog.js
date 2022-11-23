var post_Controller = require("../controllers/postController");
var user_controller = require("../controllers/userController");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", post_Controller.index);
router.get("/signup", user_controller.sign_up_get);
router.post("/signup", user_controller.sign_up_post);
module.exports = router;

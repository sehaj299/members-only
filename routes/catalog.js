var post_Controller = require("../controllers/postController");
var user_controller = require("../controllers/userController");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", post_Controller.index);
router.get("/signup", user_controller.sign_up_get);
router.get("/logout", user_controller.logout);
router.post("/signup", user_controller.sign_up_post);
router.get("/createpost", post_Controller.create_post);
router.post("/createpost", post_Controller.create_post_submit);
router.get("/post/:id/delete", post_Controller.post_delete_get);
router.post("/post/:id/delete", post_Controller.post_delete_post);
router.get("/post/:id/update", post_Controller.post_update_get);
router.post("/post/:id/update", post_Controller.post_update_post);



module.exports = router;

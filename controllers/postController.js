var Post = require("../models/post");
var { check, validationResult } = require("express-validator");

exports.index = (req, res) => {
  Post.find()
  .populate('author')
  .then((data) => {
    console.log(data);
    res.render("index", { post: data,title:"homepage"});
  });
};
exports.create_post = (req, res) => {
  res.render("createpost");
};
exports.create_post_submit = [
  check("title", "Title must not be empty.")
    .trim()

    .isLength({ min: 1 })

    .escape(),

  check("text", "text field must not be empty.")
    .trim()

    .isLength({ min: 1 })

    .escape(),

  // Process request after validation and sanitization.

  (req, res, next) => {
    // Extract the validation errors from a request.

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("createpost", { errors: errors.array() });
      return;
    }

    const post = new Post({
      title: req.body.title,

      author:req.user ,

      text: req.body.text,

      edited: "false",
    });

    post.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/catalog");
    });
  },
];
 exports.post_delete_get=(req,res)=>{
  const id=req.params.id
  Post.findById(id)
  .then((data)=>{
    res.render('deletePost',{ post:data})
  })


 }
 exports.post_delete_post=(req,res,next)=>{
  Post.findByIdAndRemove(req.params.id, function deletepost(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog");
  });
};

exports.post_update_get=(req,res)=>{
  const id =req.params.id
  Post.findById(id)
  .then((data)=>{
    res.render('updatePost',{ post:data})
  })
}

exports.post_update_post=[
  (req, res, next) => {
    console.log(req.body);
  
    const newpost = new Post({
      title: req.body.title,

      author:req.user ,

      text: req.body.text,

      edited: "true",

      _id:req.params.id
    });
    Post.findByIdAndUpdate(req.params.id, newpost, {}, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/catalog");
    });
  },
];


var Post = require("../models/post");
var { check, validationResult } = require("express-validator");

exports.index = (req, res) => {
  Post.find()
  .populate('author')
  .then((data) => {
    console.log(data);
    res.render("index", { post: data, title: "homepage" });
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

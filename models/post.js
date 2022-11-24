const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  edited: { type: String, required: true },
 
});

// creating virtual link
PostSchema.virtual("url").get(function () {
 
  return "/catalog/post/" + this._id;
});

//Export model
module.exports = mongoose.model("Post", PostSchema);

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  // photo: {
  //   type: String,
  //   required: false,
  // }
});
const PostModel = mongoose.model("post", PostSchema);

export default PostModel;

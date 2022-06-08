import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  commnets: {
    type: [String],
    default: [],
  },
  createdAt: {
    //without new in mongoose and remove object timestamps
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMEssage", postSchema);

export default PostMessage;

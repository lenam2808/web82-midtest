import mongoose from "mongoose";
import { COLLECTION } from "../utils/collections.js";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  content: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  upDateAt: {
    type: Date,
    default: Date.now(),
  },
});

const PostModel = new mongoose.model(COLLECTION.POSTS, postSchema)

export const createPostDB = (data) => {
  return PostModel.create(data)
}

export const findPostDB = (data) => {
  return PostModel.findById(data)
}

export default PostModel
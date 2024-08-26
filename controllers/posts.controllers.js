import { createPostDB, findPostDB } from "../models/posts.model.js";
import { findUserDB } from "../models/users.model.js";

export const createPost = async (req, res) => {
  const { content } = req.body;
  const { apikey } = req.query;
  const apikeyUserId = apikey.split("-$")[1];
  const apikeyEmail = apikey.split("-$")[2];
  const apiKey = apikey.split("-$")[3];
  try {
    if (!apikey) throw new Error("You have to login first");
    if (!content) throw new Error("content is required");
    const checkUser = await findUserDB(apikeyEmail);
    if (checkUser._id.toString() === apikeyUserId) {
      const newPost = {
        userId: checkUser._id.toString(),
        content,
      };
      const createNewPost = await createPostDB(newPost);
      res.status(201).send({
        message: "create successful",
        post: createNewPost,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { content } = req.body;
  const { apikey } = req.query;
  const apikeyUserId = apikey.split("-$")[1];
  const apikeyEmail = apikey.split("-$")[2];
  const apiKey = apikey.split("-$")[3];
  const { postId } = req.params;
  try {
    const checkPost = await findPostDB(postId);
    if (!checkPost) throw new Error("Post not found");
    const checkUser = checkPost.userId === apikeyUserId
    if (!checkUser) throw new Error("You can not edit this post");
    checkPost.content = content;
    checkPost.save();
    res.status(200).send({
      message: "update success",
      post: checkPost,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

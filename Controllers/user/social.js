
const Post = require("../../models/post");
const deleteFiles = require('../../lib/deleteFiles')
const uploadToCloud =  require('../../utils/uploads/uploadFiles')

module.exports = {
  addPost: async (req, res) => {
    try {
      const { body } = req;
      const { file } = req;
      const{id}=req.user

      const savePost = await new Post({
        userId: id,
        discription: body.discription,
      });

      if (file) {
        const upLoadImage =await uploadToCloud(file)
        console.log(upLoadImage);
        savePost.image = upLoadImage[0].path
        const response = await deleteFiles('public'+ upLoadImage[0].path)
        console.log(response,'->res');
      }

      console.log('log');

      await savePost.save()
      
      res.status(200).json({ message: "Post added successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  reaction: async (req, res) => {
    try {
      const { reactionType, postId, userId } = req.body;

      let updateQuery = {};

      if (reactionType === "like") {
        updateQuery = {
          $addToSet: { like: userId },
          $pull: { dislike: userId },
        };
      } else if (reactionType === "dislike") {
        updateQuery = {
          $addToSet: { dislike: userId },
          $pull: { like: userId },
        };
      } else if (reactionType === "unlike") {
        updateQuery = { $pull: { like: userId } };
      } else if (reactionType === "undislike") {
        updateQuery = { $pull: { dislike: userId } };
      } else {
        throw new Error("Invalid reaction type.");
      }

      const updatedPost = await Post.findByIdAndUpdate(postId, updateQuery, {
        new: true,
      });

      res.status(200).json({ message: `you ${reactionType} the post` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPosts: async (req, res) => {
    try {
      const perPage = 20;
      const page = req.query.page || 1;

      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage);


        res.status(200).json({posts})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

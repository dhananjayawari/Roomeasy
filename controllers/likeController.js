const Like = require("../models/Like");
const Property = require("../models/Property");

// Like a Post
exports.likeProperty = async (req, res) => {
    try {
      const { property, user } = req.body;
      console.log("sakdjf");
      const like = new Like({
        property,
        user,
      });
      const savedLike = await like.save();
  
      // Update Post Collection basis on this
      const updatedProperty= await Property.findByIdAndUpdate(
        property,
        { $push: { likes: savedLike._id } },
        { new: true }
      )
        .populate("likes")
        .exec();
  
      res.json({
        post: updatedProperty,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Error While Like Post",
      });
    }
  };
  
  // Unlike a Post
  exports.unlikeProperty = async (req, res) => {
    try {
      const { property, like } = req.body;
  
      // find and delete the from like collection
      const deletedLike = await Like.findOneAndDelete({ property: property, _id: like });
  
      // update the post collection
      const updatedProperty = await Property.findByIdAndUpdate(
        property,
        { $pull: { likes: deletedLike._id } },
        { new: true }
      );
  
      res.json({
        property: updatedProperty,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Error While unLike Post",
      });
    }
  };
const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
});

// Method to add a like
pictureSchema.methods.addLike = function (userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
  }
  return this.save();
};

// Method to remove a like
pictureSchema.methods.removeLike = function (userId) {
  this.likes = this.likes.filter(
    (like) => like.toString() !== userId.toString()
  );
  return this.save();
};

// Method to add a follower
pictureSchema.methods.addFollower = function (userId) {
  if (!this.followers.includes(userId)) {
    this.followers.push(userId);
  }
  return this.save();
};

// Method to remove a follower
pictureSchema.methods.removeFollower = function (userId) {
  this.followers = this.followers.filter(
    (follower) => follower.toString() !== userId.toString()
  );
  return this.save();
};

// Method to add a tag
pictureSchema.methods.addTag = function (tag) {
  if (!this.tags.includes(tag)) {
    this.tags.push(tag);
  }
  return this.save();
};

// Method to remove a tag
pictureSchema.methods.removeTag = function (tag) {
  this.tags = this.tags.filter((existingTag) => existingTag !== tag);
  return this.save();
};

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;

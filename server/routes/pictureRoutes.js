const express = require("express");
const Picture = require("../models/Picture");
const User = require("../models/User");
const router = express.Router();

// Get All Pictures
router.get("/", async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.json(pictures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Like a Picture
router.put("/:id/like", async (req, res) => {
  const { userId } = req.body;
  const pictureId = req.params.id;
  const picture = await Picture.findById(pictureId);
  if (!picture.likes.includes(userId)) {
    picture.likes.push(userId);
    await picture.save();
  }
  res.json({ likes: picture.likes.length });
});

// Follow a User
router.put("/:id/follow", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    const picture = await Picture.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!picture) return res.status(404).json({ message: "Picture not found" });

    if (!picture.followers.includes(userId)) {
      picture.followers.push(userId);
      user.followedPictures.push(picture._id);
      await user.save();
      await picture.save();
      return res.json({ message: "Picture followed" });
    } else {
      return res
        .status(400)
        .json({ message: "User already follows this picture" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unfollow a User
router.put("/:id/unfollow", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    const picture = await Picture.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!picture) return res.status(404).json({ message: "Picture not found" });

    if (picture.followers.includes(userId)) {
      picture.followers.pull(userId);
      user.followedPictures.pull(picture._id);
      await user.save();
      await picture.save();
      return res.json({ message: "Picture unfollowed" });
    } else {
      return res
        .status(400)
        .json({ message: "User does not follow this picture" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a tag to a Picture
router.put("/:id/tags", async (req, res) => {
  try {
    const { tag } = req.body;
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: "Picture not found" });
    }

    picture.tags.push(tag);
    await picture.save();
    res.json(picture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [pictures, setPictures] = useState([]);
  const [tagInputs, setTagInputs] = useState({});
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pictures");
        const picturesWithCounts = response.data.map((picture) => ({
          ...picture,
          likeCount: picture.likes ? picture.likes.length : 0,
          followCount: picture.followers ? picture.followers.length : 0,
          isFollowed: false,
          isLiked: false,
          tags: picture.tags || [],
        }));
        setPictures(picturesWithCounts);
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };
    fetchPictures();
  }, []);

  const handleLike = async (pictureId) => {
    const picture = pictures.find((pic) => pic._id === pictureId);

    if (picture.isLiked) {
      console.log("Already liked");
      return;
    }

    if (!loggedInUserId) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/pictures/${pictureId}/like`,
        { userId: loggedInUserId }
      );
      const updatedLikeCount = response.data.likes;

      setPictures((prevPictures) =>
        prevPictures.map((pic) =>
          pic._id === pictureId
            ? { ...pic, likeCount: updatedLikeCount, isLiked: true }
            : pic
        )
      );
    } catch (error) {
      console.error("Error liking the picture:", error);
    }
  };

  const handleFollow = async (pictureId) => {
    if (!loggedInUserId) {
      console.error("User not logged in");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/pictures/${pictureId}/follow`,
        { userId: loggedInUserId }
      );
      setPictures((prevPictures) =>
        prevPictures.map((picture) =>
          picture._id === pictureId
            ? {
                ...picture,
                isFollowed: true,
                followCount: picture.followCount + 1,
              }
            : picture
        )
      );
    } catch (error) {
      console.error("Error following the user:", error);
    }
  };

  const handleUnfollow = async (pictureId) => {
    if (!loggedInUserId) {
      console.error("User not logged in");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/pictures/${pictureId}/unfollow`,
        { userId: loggedInUserId }
      );
      setPictures((prevPictures) =>
        prevPictures.map((picture) =>
          picture._id === pictureId
            ? {
                ...picture,
                isFollowed: false,
                followCount: picture.followCount - 1,
              }
            : picture
        )
      );
    } catch (error) {
      console.error("Error unfollowing the user:", error);
    }
  };

  const handleTagSubmit = async (pictureId) => {
    const newTag = tagInputs[pictureId] || "";
    if (newTag.trim() === "") return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/pictures/${pictureId}/tags`,
        { tag: newTag }
      );

      setPictures((prevPictures) =>
        prevPictures.map((picture) =>
          picture._id === pictureId
            ? { ...picture, tags: [...picture.tags, newTag] }
            : picture
        )
      );

      setTagInputs((prev) => ({ ...prev, [pictureId]: "" }));
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <div className="homepage">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, width: "50%" }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <div className="content" style={{ marginTop: "64px" }}>
        <div className="pictures-container">
          {pictures.length > 0 ? (
            pictures.map((picture) => (
              <div key={picture._id} className="picture-item">
                <img
                  src={picture.url}
                  alt={picture.tags.join(", ")}
                  className="picture-image"
                />
                <p>Tags: {picture.tags.join(", ")}</p>
                <div className="button-group">
                  <Button
                    onClick={() => handleLike(picture._id)}
                    variant="outlined"
                    color="primary"
                    startIcon={<FavoriteIcon />}
                    disabled={picture.isLiked}
                  >
                    Like {picture.likeCount}
                  </Button>
                  <Button
                    onClick={() => handleFollow(picture._id)}
                    variant="contained"
                    color="primary"
                    disabled={picture.isFollowed}
                  >
                    Follow
                  </Button>
                  <Button
                    onClick={() => handleUnfollow(picture._id)}
                    variant="outlined"
                    color="secondary"
                    disabled={!picture.isFollowed}
                  >
                    Unfollow
                  </Button>
                </div>
                <Box display="flex" alignItems="center" marginTop={1}>
                  <TextField
                    value={tagInputs[picture._id] || ""}
                    onChange={(e) =>
                      setTagInputs({
                        ...tagInputs,
                        [picture._id]: e.target.value,
                      })
                    }
                    label="Add a tag"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "10px" }} // Space between input and button
                  />
                  <Button
                    onClick={() => handleTagSubmit(picture._id)}
                    variant="contained"
                    color="primary"
                  >
                    Submit Tag
                  </Button>
                </Box>
              </div>
            ))
          ) : (
            <Typography variant="h6">No pictures available</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

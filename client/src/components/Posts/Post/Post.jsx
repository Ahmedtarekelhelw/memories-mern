import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/posts";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Link } from "react-router-dom";
import "./style.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Post = ({ post, setId }) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?.googleId || user?.result?._id;
  const findUser = post?.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (findUser) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />{" "}
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    // <Link
    //   to={`/posts/${post._id}`}
    //   style={{ textDecoration: "none", color: "inherit" }}
    // >
    <Card>
      <CardMedia component="img" height="100" image="" alt="card" />
      <CardContent>
        <Typography variant="h4">ahmed tarek</Typography>
        <Typography variant="body2">lorem ipsum dolor sit am</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleLike} disabled={!user?.token}>
          <Likes />
        </Button>
        <Button onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
      </CardActions>
    </Card>
    // <div>
    //   <img src={post.selectedFile} alt="" width="100" />
    //   <h1>{post.title}</h1>
    //   <h2>{post.message}</h2>
    //   {post.tags.map((tag, i) => (
    //     <span key={i}>{`#${tag}`} </span>
    //   ))}
    //   <span>{post.name}</span>
    //   <span>{moment(post.createdAt).fromNow()}</span>
    //   {(user?.result._id === post.creator ||
    //     user?.result.googleId === post.creator) && (
    //     <>
    //       <button onClick={() => setId(post._id)}>Edit</button>
    //     </>
    //   )}

    // </div>
    // </Link>
  );
};

export default Post;

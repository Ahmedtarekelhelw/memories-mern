import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPostBySearch } from "../redux/actions/posts";
import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import moment from "moment";
import Comments from "../components/Comments/Comments";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
  }, [post, dispatch]);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  if (isLoading) {
    return (
      <Paper elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const openPost = (_id) => navigate(`/posts/${_id}`);
  return (
    <div>
      <div>
        <Typography variant="h3" component="h2">
          {post?.title}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          color="textSecondary"
          component="h2"
        >
          {post?.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          {post?.message}
        </Typography>
        <Typography variant="h6">Created by: {post?.name}</Typography>
        <Typography variant="body1">
          {moment(post?.createdAt).fromNow()}
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1">
          <strong>Realtime Chat - coming soon!</strong>
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Comments post={post} />
        <Divider style={{ margin: "20px 0" }} />
      </div>
      <div>
        <img
          src={
            post?.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt={post?.title}
        />
      </div>
      <Divider />
      {recommendedPosts.length && (
        <>
          <Typography variant="h3">You MIght Like This: </Typography>
          {recommendedPosts.map(({ title, _id }) => (
            <Typography
              key={_id}
              onClick={() => openPost(_id)}
              sx={{ cursor: "pointer" }}
            >
              {title}
            </Typography>
          ))}
        </>
      )}
    </div>
  );
};

export default PostDetails;

import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";

const Posts = ({ setId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <CircularProgress />
      ) : posts?.length > 0 ? (
        posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setId={setId} />
          </Grid>
        ))
      ) : (
        <h2>There is No Memories</h2>
      )}
    </Grid>
  );
};

export default Posts;

import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../redux/actions/posts";

const Comments = ({ post }) => {
  const [comments, setComments] = useState(post?.commnets);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user?.result.name}: ${comment}`;

    let newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Stack>
      <Grid item>
        <Typography variant="h6">Comments</Typography>
        {comments?.map((c, i) => (
          <Typography key={i}>{c}</Typography>
        ))}
        <div ref={commentsRef} />
      </Grid>
      <Grid item>
        {user?.result?.name && (
          <>
            <Typography variant="h6" gutterBottom>
              Write a Comment
            </Typography>
            <TextField
              multiline
              rows={4}
              label="Comment"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              disabled={!comment}
              style={{ marginTop: "10px" }}
              onClick={handleClick}
            >
              COMMENT
            </Button>
          </>
        )}
      </Grid>
    </Stack>
  );
};

export default Comments;

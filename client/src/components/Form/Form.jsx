import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../redux/actions/posts";
import FileBase from "react-file-base64";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Form = ({ setId, id }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    id ? state.posts.posts.find((p) => p._id === id) : null
  );

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);

  const [newPost, setNewPost] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) {
      setNewPost(post);
    }
  }, [post]);

  const clear = () => {
    setId(null);
    setNewPost({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updatePost(id, { ...newPost, name: user?.result?.name }));
      clear();
    } else {
      dispatch(createPost({ ...newPost, name: user?.result?.name }, navigate));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper sx={{ margin: "10px 0" }}>
        <Typography variant="h6" p={1} textAlign="center">
          Please Sign In To Enable To Create A Post
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ margin: "10px 0", padding: "20px 0" }} elevation={6}>
      <Typography variant="h6" textAlign={"center"}>
        {id ? "Editing " : "Creating"} Your Memory
      </Typography>
      <form action="" onSubmit={handleSubmit}>
        <Stack spacing={1} px={2}>
          <TextField
            name="title"
            label="Title"
            size="small"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            size="small"
            value={newPost.message}
            onChange={(e) =>
              setNewPost({ ...newPost, message: e.target.value })
            }
          />

          <TextField
            label="Tags (coma separated)"
            fullWidth
            size="small"
            value={newPost.tags}
            onChange={(e) =>
              setNewPost({ ...newPost, tags: e.target.value.split(",") })
            }
          />

          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setNewPost({ ...newPost, selectedFile: base64 })
            }
          />
          <Button variant="contained" fullWidth type="submit" size="small">
            Submit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            fullWidth
            onClick={() => clear()}
          >
            Clear
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Form;

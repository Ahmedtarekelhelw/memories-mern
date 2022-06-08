import { Button, Chip, Stack, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostBySearch } from "../redux/actions/posts";

const Search = ({ search, setSearch, tags, setTags }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = (t) => {
    setTags(tags.filter((tag) => tag !== t));
  };

  const handleChip = (e) => {
    if (e.target.value) {
      if (e.keyCode === 13) {
        const find = tags.find((tag) => tag === e.target.value);
        if (find) {
          e.target.value = "";
        } else {
          setTags([...tags, e.target.value.toLowerCase()]);
          e.target.value = "";
        }
      }
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Stack
      spacing={1}
      sx={{
        backgroundColor: "white",
        padding: "15px",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        borderRadius: "5px",
      }}
    >
      <TextField
        label="Search Memories"
        name="search"
        onKeyDown={handleKeyPress}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TextField
        label="Tags"
        onKeyDown={handleChip}
        InputProps={{
          startAdornment: tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ marginRight: "5px" }}
              onDelete={() => handleDelete(tag)}
              onClick={() => {}}
              variant="outlined"
            />
          )),
        }}
      ></TextField>
      <Button variant="contained" onClick={searchPost}>
        Search
      </Button>
    </Stack>
  );
};

export default Search;

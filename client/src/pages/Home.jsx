import { Container, Grid, Grow, Paper } from "@mui/material";
import React, { useState } from "react";
import Form from "../components/Form/Form";
import MainPagintaion from "../components/MainPagintaion";
import Posts from "../components/Posts/Posts";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [id, setId] = useState(null);
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={7} md={9}>
            <Posts setId={setId} />
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <Search
              search={search}
              setSearch={setSearch}
              tags={tags}
              setTags={setTags}
            />
            <Form setId={setId} id={id} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} sx={{ padding: "5px 0px" }}>
                <MainPagintaion page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

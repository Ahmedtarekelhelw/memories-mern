import { PaginationItem, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/posts";

const MainPagintaion = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <Pagination
      count={numberOfPages}
      variant="outlined"
      page={Number(page)}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          components={Link}
          href={`/posts?page=${item.page}`}
        />
      )}
    ></Pagination>
  );
};

export default MainPagintaion;

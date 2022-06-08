import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PostDetails from "./pages/PostDetails";

const RequireAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return !user ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="posts" element={<Home />} />
          <Route path="posts/search" element={<Home />} />
          <Route path="posts/:id" element={<PostDetails />} />
          <Route
            path="auth"
            element={
              <RequireAuth>
                <Auth />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;

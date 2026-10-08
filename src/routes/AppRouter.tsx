import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import Posts from "../pages/Posts/Posts";
import Todos from "../pages/Todos/Todos";
import PostDetailsPage from "../components/PostDetailsPage/PostDetailsPage";
import FormPost from "../components/FormPost/FormPost";
import { Toaster } from "react-hot-toast";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/posts/:id" element={<PostDetailsPage />} />
          <Route path="/posts/new" element={<FormPost />} />
          <Route path="/posts/:id/edit" element={<FormPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

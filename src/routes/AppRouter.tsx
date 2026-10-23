import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

import Login from "../pages/Login/Login";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "../components/PageLoader/PageLoader";

const Posts = lazy(() => import("../pages/Posts/Posts"));
const Todos = lazy(() => import("../pages/Todos/Todos"));
const PostDetailsPage = lazy(
  () => import("../components/PostDetailsPage/PostDetailsPage"),
);
const FormPost = lazy(() => import("../components/FormPost/FormPost"));
const Albums = lazy(() => import("../components/Albums/Albums"));
const AlbumPhotos = lazy(() => import("../pages/AlbumPhotos/AlbumPhotos"));
const Users = lazy(() => import("../pages/Users/Users"));
const DetailsUser = lazy(() => import("../pages/DetailsUser/DetailsUser"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<PageLoader />}>
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
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:id" element={<AlbumPhotos />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<DetailsUser />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;

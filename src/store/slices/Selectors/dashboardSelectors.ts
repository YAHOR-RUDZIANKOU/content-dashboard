import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../index";

export const posts = (state: RootState) => state.dashboard.post;
export const todos = (state: RootState) => state.dashboard.todos;
export const photos = (state: RootState) => state.dashboard.photos;
export const albums = (state: RootState) => state.dashboard.albums;
export const users = (state: RootState) => state.dashboard.users;
export const currentId = (state: RootState) => state.auth.user?.id;

export const selectDashboard = createSelector(
  [posts, todos, photos, albums, currentId, users],
  (usersPost, usersTodos, usersPhotos, usersAlbums, currentId, users) => {
    const currentUserPosts = usersPost.filter(
      (value) => value.userId === currentId,
    );
    const postsCount = currentUserPosts.length;
    const subtitlePost = postsCount
      ? `${postsCount} ваших`
      : "ваши посты отсутствуют";

    const currentUserTodos = usersTodos.filter(
      (value) => value.userId === currentId && value.completed,
    );
    const todosCount = currentUserTodos.length;
    const subtitleTodos = todosCount
      ? `${todosCount} незакрытых у вас`
      : "все задачи выполнены!";

    const usersCount = users.length;
    const subtitleUsers =
      usersCount === 10 ? "все активны" : `${usersCount} активных`;

    const albumsCount = usersPhotos.length;
    const subtitleAlbums = albumsCount
      ? `${albumsCount} фотографий`
      : `фотографий нет`;

    return {
      postsTitle: usersPost.length,
      subtitlePost,
      todosTitle: usersTodos.length,
      subtitleTodos,
      albumsTitle: usersAlbums.length,
      subtitleAlbums,
      usersTitle: usersCount,
      subtitleUsers,
    };
  },
);

export default selectDashboard;

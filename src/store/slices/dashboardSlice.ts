import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardApi from "../../api/dashboardApi";
import type { Post, Todo, Album, Photos } from "../../types/dashboard";
import type { User } from "../../types/user";

type DashboardData = {
  post: Post[];
  todos: Todo[];
  albums: Album[];
  users: User[];
  photos: Photos[];
};

type initialType = DashboardData & {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: initialType = {
  post: [],
  todos: [],
  albums: [],
  users: [],
  photos: [],
  status: "idle",
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(dashboardThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload.post;
        state.todos = action.payload.todos;
        state.albums = action.payload.albums;
        state.users = action.payload.users;
        state.photos = action.payload.photos;
      })

      .addCase(dashboardThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export default dashboardSlice.reducer;

export const dashboardThunk = createAsyncThunk<
  DashboardData,
  void,
  { rejectValue: string }
>("dashboard/dash", async (_, thunkAPI) => {
  try {
    const [postsRes, todosRes, albumsRes, usersRes, photoRes] =
      await Promise.all([
        dashboardApi.getPost(),
        dashboardApi.getTodos(),
        dashboardApi.getAlbum(),
        dashboardApi.getUsers(),
        dashboardApi.getPhotos(),
      ]);
    return {
      post: postsRes.data,
      todos: todosRes.data,
      albums: albumsRes.data,
      users: usersRes.data,
      photos: photoRes.data,
    };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

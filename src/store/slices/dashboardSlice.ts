import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardApi from "../../api/dashboardApi";
import type {
  Post,
  Todo,
  Album,
  Photos,
  Comments,
} from "../../types/dashboard";
import type { User } from "../../types/user";

type DashboardData = {
  post: Post[];
  todos: Todo[];
  albums: Album[];
  users: User[];
  photos: Photos[];
  comments: Comments[];
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
  comments: [],
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
        state.comments = action.payload.comments;
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
     await new Promise<void>((res) => setTimeout(() => res(), 1500));
    const [postsRes, todosRes, albumsRes, usersRes, photoRes, commentsRes] =
      await Promise.all([
        dashboardApi.getPost(),
        dashboardApi.getTodos(),
        dashboardApi.getAlbum(),
        dashboardApi.getUsers(),
        dashboardApi.getPhotos(),
        dashboardApi.getComments(),
      ]);
    return {
      post: postsRes.data,
      todos: todosRes.data,
      albums: albumsRes.data,
      users: usersRes.data,
      photos: photoRes.data,
      comments: commentsRes.data,
    };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

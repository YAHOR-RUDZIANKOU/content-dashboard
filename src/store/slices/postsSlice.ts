import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../../types/dashboard";
import axios from "axios";

type FetchPostsArgs = {
  page: number;
  limit: number;
  userId: number | undefined;
};

type initialType = {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalCount: number;
};

type AsyncThunk = {
  posts: Post[];
  totalCount: number;
};

const initialState: initialType = {
  totalCount: 0,
  items: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(postThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.posts;
        state.totalCount = action.payload.totalCount;
      })

      .addCase(postThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export default postSlice.reducer;

export const postThunk = createAsyncThunk<
  AsyncThunk,
  FetchPostsArgs,
  { rejectValue: string }
>("post/fetchPosts", async ({ page, limit, userId }, thunkAPI) => {
  try {
    const postData = await axios<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: { _page: page, _limit: limit, userId: userId },
      },
    );
    return {
      posts: postData.data,
      totalCount: postData.headers["x-total-count"],
    };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

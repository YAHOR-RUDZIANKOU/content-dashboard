import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Post } from "../../types/dashboard";

type FetchPostsArgs = {
  id: string | undefined;
};

type PostError = {
  message: string;
  status?: number;
};

type initialType = {
  detailsPost: Post | null;
  statusPost: "idle" | "loading" | "succeeded" | "failed";
  errorPost: PostError | null;
};

const initialState: initialType = {
  detailsPost: null,
  statusPost: "idle",
  errorPost: null,
};

const getPostByIdSlice = createSlice({
  name: "postId",
  initialState,
  reducers: {
    updateStatus(state) {
      state.statusPost = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postIdThunk.pending, (state) => {
        state.statusPost = "loading";
        state.errorPost = null;
      })

      .addCase(postIdThunk.fulfilled, (state, action) => {
        state.statusPost = "succeeded";
        state.detailsPost = action.payload;
      })

      .addCase(postIdThunk.rejected, (state, action) => {
        state.statusPost = "failed";
        state.errorPost = action.payload ?? { message: "Неизвестная ошибка" };
      });
  },
});

export default getPostByIdSlice.reducer;

export const { updateStatus } = getPostByIdSlice.actions;

export const postIdThunk = createAsyncThunk<
  Post,
  FetchPostsArgs,
  { rejectValue: PostError }
>("postId/fetchPostId", async ({ id }, thunkAPI) => {
  try {
    await new Promise<void>((res) => setTimeout(() => res(), 1000));
    const postId = await axios<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    return postId.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue({
      message: errorMessage,
      status: axios.isAxiosError(e) ? e.response?.status : undefined,
    });
  }
});

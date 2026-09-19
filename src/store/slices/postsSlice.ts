import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../../types/dashboard";
import axios from "axios";

type FetchPostsArgs = {
  page: number;
  limit: number;
  userId: number | undefined;
  debouncedSearch: string;
};

type PostError = {
  message: string;
  status?: number;
};

type DeletePostsArg = {
  selectedPost: Post;
};

type initialType = {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  statusError: "idle" | "loading" | "succeeded" | "failed";
  error: PostError | null;
  totalCount: number;
  postDelete: Post | null;
  errorDelete: string | null;
  indexDeletePost: number | null;
};

type AsyncThunk = {
  posts: Post[];
  totalCount: number;
};

const initialState: initialType = {
  totalCount: 0,
  items: [],
  status: "idle",
  statusError: "idle",
  error: null,
  postDelete: null,
  errorDelete: null,
  indexDeletePost: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateErrorDelete(state) {
      state.errorDelete = null;
    },
  },
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
        state.error = action.payload ?? { message: "Неизвестная ошибка" };
      })

      .addCase(postDelete.pending, (state, action) => {
        state.statusError = "loading";
        state.postDelete = action.meta.arg.selectedPost;
        state.indexDeletePost = state.items.findIndex(
          (value) => value.id === state.postDelete?.id,
        );
        state.items = state.items.filter(
          (value) => value.id !== state.postDelete?.id,
        );
      })

      .addCase(postDelete.fulfilled, (state) => {
        state.statusError = "succeeded";
        state.errorDelete = null;
        state.postDelete = null;
        state.indexDeletePost = null;
      })

      .addCase(postDelete.rejected, (state, action) => {
        state.statusError = "failed";
        state.errorDelete = action.payload ?? "Неизвестная ошибка";
        if (state.postDelete && state.indexDeletePost !== null) {
          state.items.splice(state.indexDeletePost, 0, state.postDelete);
        }
      });
  },
});

export const { updateErrorDelete } = postSlice.actions;

export default postSlice.reducer;

export const postThunk = createAsyncThunk<
  AsyncThunk,
  FetchPostsArgs,
  { rejectValue: PostError }
>(
  "post/fetchPosts",
  async ({ page, limit, userId, debouncedSearch }, thunkAPI) => {
    try {
      const postData = await axios<Post[]>(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _page: page,
            _limit: limit,
            userId: userId,
            q: debouncedSearch,
          },
        },
      );
      return {
        posts: postData.data,
        totalCount: postData.headers["x-total-count"],
      };
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Неизвестная ошибка";
      return thunkAPI.rejectWithValue({
        message: errorMessage,
        status: axios.isAxiosError(e) ? e.response?.status : undefined,
      });
    }
  },
);

export const postDelete = createAsyncThunk<
  Post,
  DeletePostsArg,
  { rejectValue: string }
>("post/deletePost", async ({ selectedPost }: DeletePostsArg, thunkAPI) => {
  try {
    await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`,
    );
    return selectedPost;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

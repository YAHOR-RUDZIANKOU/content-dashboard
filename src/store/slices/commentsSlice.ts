import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Comments } from "../../types/dashboard";

type PostError = {
  message: string;
  status?: number;
};

type initialStateProps = {
  commentsItems: Comments[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: PostError | null;
  commentsMap: Record<number, number>;
};

const initialState: initialStateProps = {
  commentsItems: [],
  status: "idle",
  error: null,
  commentsMap: {},
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(commentThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.commentsItems = action.payload;
      const countCommentPostId: Record<number, number> = {};
      state.commentsItems.map((comment) => {
        countCommentPostId[comment.postId] =
          (countCommentPostId[comment.postId] ?? 0) + 1;
      });
      state.commentsMap = countCommentPostId;
    });
  },
});

export default commentSlice.reducer;

export const commentThunk = createAsyncThunk(
  "comment/commentThunk",
  async (_, thunkAPI) => {
    try {
      const todosResponse = await axios(
        `https://jsonplaceholder.typicode.com/comments`,
      );
      return todosResponse.data;
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

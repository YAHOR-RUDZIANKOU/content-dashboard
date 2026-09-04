import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../../types/dashboard";
import axios from "axios";

type initialType = {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: initialType = {
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
        state.items = action.payload;
      })

      .addCase(postThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export default postSlice.reducer;

export const postThunk = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("post/fetchPosts", async (_, thunkAPI) => {
  try {
    const postData = await axios<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
    );
    return postData.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

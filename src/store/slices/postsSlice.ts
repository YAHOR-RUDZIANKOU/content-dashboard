import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../../types/dashboard";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

type FetchCreatePostsArgs = {
  title: string;
  body: string;
  userId: number;
};

type CreatePostResponse = FetchCreatePostsArgs & {
  id: number;
};

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
  deletedPostIds: number[];

  statusCreatePost: "idle" | "loading" | "succeeded" | "failed";
  errorCreatePost: PostError | null;
  createPost: CreatePostResponse[];

  statusEditPost: "idle" | "loading" | "succeeded" | "failed";
  errorEditPost: PostError | null;
  editPost: CreatePostResponse[];
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
  deletedPostIds: [],

  statusCreatePost: "idle",
  errorCreatePost: null,
  createPost: [],

  statusEditPost: "idle",
  errorEditPost: null,
  editPost: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateErrorDelete(state) {
      state.errorDelete = null;
    },
    updateDeletedPostIds(state) {
      console.log(state.deletedPostIds);
      state.deletedPostIds = [];
    },
    resetFormStatuses(state) {
      state.statusCreatePost = "idle";
      state.statusEditPost = "idle";
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
        state.totalCount = action.payload.totalCount;

        // newPost посты с сервера и еще добавленные в зависимости от выбранной страницы
        let newPost;

        if (action.meta.arg.page === 1) {
          newPost = [...state.createPost, ...action.payload.posts];
        } else {
          newPost = action.payload.posts;
        }

        // editServerPost измененные посты
        const editServerPost = newPost.map((post) => {
          const togglePost = state.editPost.find(
            (changePost) => changePost.id === post.id,
          );
          return togglePost ? togglePost : post;
        });

        // cleanServerPost - массив  с учетом удаленных постов
        const cleanServerPost = editServerPost.filter(
          (post) => !state.deletedPostIds.includes(post.id),
        );

        state.items = cleanServerPost;
      })
      .addCase(postThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? { message: "Неизвестная ошибка" };
      })

      .addCase(postDelete.pending, (state, action) => {
        state.statusError = "loading";
        state.postDelete = action.meta.arg.selectedPost;
        state.deletedPostIds.push(state.postDelete.id);
        state.indexDeletePost = state.items.findIndex(
          (value) => value.id === state.postDelete?.id,
        );
        state.items = state.items.filter(
          (value) => value.id !== state.postDelete?.id,
        );
        console.log(current(state.deletedPostIds));
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
      })

      .addCase(createNewPostThunk.pending, (state) => {
        state.statusCreatePost = "loading";
        state.errorCreatePost = null;
      })
      .addCase(createNewPostThunk.fulfilled, (state, action) => {
        state.statusCreatePost = "succeeded";
        state.items.push(action.payload);
        state.createPost.unshift(action.payload);
        console.log(
          "Что лежит в createPost перед склеиванием:",
          JSON.parse(JSON.stringify(state.createPost)),
        );
      })
      .addCase(createNewPostThunk.rejected, (state, action) => {
        state.statusCreatePost = "failed";
        state.errorCreatePost = action.payload ?? {
          message: "Неизвестная ошибка",
        };
      })

      .addCase(editPostThunk.pending, (state) => {
        state.statusEditPost = "loading";
        state.errorEditPost = null;
      })
      .addCase(editPostThunk.fulfilled, (state, action) => {
        state.statusEditPost = "succeeded";
        state.editPost = state.editPost.filter(
          (post) => post.id !== action.payload.id,
        );
        state.editPost.push(action.payload);
      })
      .addCase(editPostThunk.rejected, (state, action) => {
        state.statusEditPost = "failed";
        state.errorEditPost = action.payload ?? {
          message: "Неизвестная ошибка",
        };
      });
  },
});

export const { updateErrorDelete, updateDeletedPostIds, resetFormStatuses } =
  postSlice.actions;

export default postSlice.reducer;

export const postThunk = createAsyncThunk<
  AsyncThunk,
  FetchPostsArgs,
  { rejectValue: PostError }
>(
  "post/fetchPosts",
  async ({ page, limit, userId, debouncedSearch }, thunkAPI) => {
    try {
      await new Promise<void>((res) => setTimeout(() => res(), 1000));
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

export const createNewPostThunk = createAsyncThunk<
  CreatePostResponse,
  FetchCreatePostsArgs,
  { rejectValue: PostError }
>("posts/createPost", async (newPosts, thunkAPI) => {
  try {
    await new Promise<void>((res) => setTimeout(() => res(), 1000));
    const newPost = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      newPosts,
    );
    const modifiedData = {
      ...newPost.data,
      id: Date.now(),
    };
    return modifiedData;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue({
      message: errorMessage,
      status: axios.isAxiosError(e) ? e.response?.status : undefined,
    });
  }
});

export const editPostThunk = createAsyncThunk<
  CreatePostResponse,
  CreatePostResponse,
  { rejectValue: PostError }
>("posts/editPost", async (editPosts, thunkAPI) => {
  try {
    if (editPosts.id > 150) {
      return editPosts;
    }
    await new Promise<void>((res) => setTimeout(() => res(), 1000));
    const updatedPost = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${editPosts.id}`,
      editPosts,
    );
    return updatedPost.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue({
      message: errorMessage,
      status: axios.isAxiosError(e) ? e.response?.status : undefined,
    });
  }
});

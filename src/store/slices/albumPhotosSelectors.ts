import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Album, Photos } from "../../types/dashboard";

type currentAlbumArgs = {
  id: string | undefined;
};

type photoThunkArgs = {
  id: string | undefined;
  limit: number;
  page: number;
};

type PostError = {
  message: string;
  status?: number;
};

type initialStateProps = {
  statusAlbum: "idle" | "loading" | "succeeded" | "failed";
  errorAlbum: PostError | null;
  currentAlbum: Album | null;

  totalCount: number;

  statusPhotos: "idle" | "loading" | "succeeded" | "failed";
  errorPhotos: PostError | null;
  currentPhotos: Photos[];
};

const initialState: initialStateProps = {
  statusAlbum: "idle",
  errorAlbum: null,
  currentAlbum: null,

  totalCount: 0,

  statusPhotos: "idle",
  errorPhotos: null,
  currentPhotos: [],
};

const albumPhotoSlice = createSlice({
  name: "albumsPhoto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(currentAlbumThunk.pending, (state) => {
        state.statusAlbum = "loading";
        state.errorAlbum = null;
      })

      .addCase(currentAlbumThunk.fulfilled, (state, action) => {
        state.statusAlbum = "succeeded";
        state.currentAlbum = action.payload;
      })

      .addCase(currentAlbumThunk.rejected, (state, action) => {
        state.statusAlbum = "failed";
        state.errorAlbum = action.payload ?? {
          message: "Неизвестная ошибка",
        };
      })

      .addCase(totalCountPhotoThunk.fulfilled, (state, action) => {
        state.totalCount = action.payload.length;
      })

      .addCase(photoThunk.pending, (state) => {
        state.statusPhotos = "loading";
        state.errorPhotos = null;
      })

      .addCase(photoThunk.fulfilled, (state, action) => {
        state.statusPhotos = "succeeded";
        state.currentPhotos = action.payload;
      })

      .addCase(photoThunk.rejected, (state, action) => {
        state.statusPhotos = "failed";
        state.errorPhotos = action.payload ?? {
          message: "Неизвестная ошибка",
        };
      });
  },
});

export default albumPhotoSlice.reducer;

export const currentAlbumThunk = createAsyncThunk<
  Album,
  currentAlbumArgs,
  { rejectValue: PostError }
>("currentAlbum/fetchById", async ({ id }, thunkAPI) => {
  try {
    const albumsData = await axios(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
    );
    return albumsData.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue({
      message: errorMessage,
      status: axios.isAxiosError(e) ? e.response?.status : undefined,
    });
  }
});

export const photoThunk = createAsyncThunk<
  Photos[],
  photoThunkArgs,
  { rejectValue: PostError }
>("albumPhotosTotal/fetchAll", async ({ id, limit, page }, thunkAPI) => {
  try {
    await new Promise<void>((res) => setTimeout(() => res(), 1000));
    const photoData = await axios(
      `https://jsonplaceholder.typicode.com/photos`,
      {
        params: {
          albumId: id,
          _limit: limit,
          _page: page,
        },
      },
    );
    return photoData.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue({
      message: errorMessage,
      status: axios.isAxiosError(e) ? e.response?.status : undefined,
    });
  }
});

// запрос, чтобы забрать totalCount
export const totalCountPhotoThunk = createAsyncThunk(
  "totalCountPhoto/fetchAlbums",
  async ({ id }: currentAlbumArgs, thunkAPI) => {
    try {
      const photoData = await axios(
        `https://jsonplaceholder.typicode.com/photos`,
        {
          params: {
            albumId: id,
          },
        },
      );
      return photoData.data;
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

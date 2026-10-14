import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Album } from "../../types/dashboard";

type photoItems = {
  albumId: number;
  id: number;
  title: string;
};

type FetchAlbumsArgs = {
  page: number;
  limit: number;
  authorId: number | undefined;
  debouncedSearch: string;
};

type AlbumsCountThunk = {
  authorId: number | undefined;
  debouncedSearch: string;
};

type PostError = {
  message: string;
  status?: number;
};

type initialStateProps = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: PostError | null;
  albums: Album[];
  totalCount: number;
  allPhoto: Record<number, number>;
};

const initialState: initialStateProps = {
  status: "idle",
  error: null,
  albums: [],
  totalCount: 0,
  allPhoto: {},
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(albumsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(albumsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.albums = action.payload;
      })

      .addCase(albumsThunk.rejected, (state, action) => {
        if (action.meta.aborted) {
          return;
        }
        state.status = "failed";
        state.error = action.payload ?? {
          message: "Неизвестная ошибка",
        };
      })

      .addCase(fetchAlbumsCountThunk.fulfilled, (state, action) => {
        state.totalCount = action.payload.length;
      })

      .addCase(fetchAllPhotoThunk.fulfilled, (state, action) => {
        const currentObj: Record<number, number> = {};
        action.payload.forEach((photo: photoItems) => {
          currentObj[photo.albumId] = (currentObj[photo.albumId] ?? 0) + 1;
        });
        state.allPhoto = currentObj;
      });
  },
});

export default albumSlice.reducer;

export const albumsThunk = createAsyncThunk<
  Album[],
  FetchAlbumsArgs,
  { rejectValue: PostError }
>(
  "albums/fetchAlbums",
  async ({ page, limit, authorId, debouncedSearch }, thunkAPI) => {
    try {
      await new Promise<void>((res) => setTimeout(() => res(), 1000));
      const albumsData = await axios(
        "https://jsonplaceholder.typicode.com/albums",
        {
          params: {
            _page: page,
            _limit: limit,
            userId: authorId,
            q: debouncedSearch,
          },
        },
      );
      return albumsData.data;
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

// делаем запрос, чтобы узнать общее кол-во элементов в массиве Albums
export const fetchAlbumsCountThunk = createAsyncThunk(
  "countAlbums/fetchCountAlbums",
  async ({ authorId, debouncedSearch }: AlbumsCountThunk, thunkAPI) => {
    try {
      const albumsData = await axios(
        "https://jsonplaceholder.typicode.com/albums",
        {
          params: {
            userId: authorId,
            q: debouncedSearch,
          },
        },
      );
      return albumsData.data;
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

export const fetchAllPhotoThunk = createAsyncThunk(
  "countPhotos/fetchCountPhotos",
  async (_, thunkAPI) => {
    try {
      const photoData = await axios(
        "https://jsonplaceholder.typicode.com/photos",
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

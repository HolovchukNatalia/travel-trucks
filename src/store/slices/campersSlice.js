import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { campersAPI } from "../../api/apiCampers.js";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await campersAPI.getCampers(params);
      return { data, params };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadMoreCampers = createAsyncThunk(
  "campers/loadMoreCampers",
  async ({ page, ...filters }, { rejectWithValue, getState }) => {
    try {
      const params = { page, limit: 4, ...filters };
      const data = await campersAPI.getCampers(params);
      return { data, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await campersAPI.getCamperById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  currentCamper: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalItems: 0,
  hasMore: true,
  lastFetchParams: {},
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCampers: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.totalItems = 0;
    },
    clearCurrentCamper: (state) => {
      state.currentCamper = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.items;
        state.totalItems = action.payload.data.total;
        state.currentPage = action.payload.params.page || 1;
        state.hasMore =
          action.payload.data.items.length ===
          (action.payload.params.limit || 4);
        state.lastFetchParams = action.payload.params;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loadMoreCampers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMoreCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload.data.items];
        state.currentPage = action.payload.page;
        state.hasMore = action.payload.data.items.length === 4;
        state.totalItems = action.payload.data.total;
      })
      .addCase(loadMoreCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetCampers, clearCurrentCamper } =
  campersSlice.actions;
export default campersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  AC: false,
  transmission: "",
  kitchen: false,
  TV: false,
  bathroom: false,
  form: "",
  appliedFilters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    loadFiltersFromUrl: (state, action) => {
      const filters = action.payload;

      state.location = filters.location || "";
      state.AC = filters.AC === "true";
      state.transmission = filters.transmission || "";
      state.kitchen = filters.kitchen === "true";
      state.TV = filters.TV === "true";
      state.bathroom = filters.bathroom === "true";
      state.form = filters.form || "";

      const apiFilters = {};
      if (state.location.trim()) apiFilters.location = state.location.trim();
      if (state.AC) apiFilters.AC = true;
      if (state.transmission) apiFilters.transmission = state.transmission;
      if (state.kitchen) apiFilters.kitchen = true;
      if (state.TV) apiFilters.TV = true;
      if (state.bathroom) apiFilters.bathroom = true;
      if (state.form) apiFilters.form = state.form;

      state.appliedFilters = apiFilters;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    toggleEquipment: (state, action) => {
      const equipment = action.payload;
      state[equipment] = !state[equipment];
    },
    setTransmission: (state, action) => {
      state.transmission =
        state.transmission === action.payload ? "" : action.payload;
    },
    setVehicleType: (state, action) => {
      state.form = state.form === action.payload ? "" : action.payload;
    },
    clearFilters: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  loadFiltersFromUrl,
  setLocation,
  toggleEquipment,
  setTransmission,
  setVehicleType,
  clearFilters,
} = filtersSlice.actions;

export const selectCurrentFilters = (state) => ({
  location: state.filters.location,
  AC: state.filters.AC,
  transmission: state.filters.transmission,
  kitchen: state.filters.kitchen,
  TV: state.filters.TV,
  bathroom: state.filters.bathroom,
  form: state.filters.form,
});

export const selectAppliedFilters = (state) => state.filters.appliedFilters;

export default filtersSlice.reducer;

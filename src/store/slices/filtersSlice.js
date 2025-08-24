import { createSlice } from "@reduxjs/toolkit";

const getFiltersFromStorage = () => {
  try {
    const filters = localStorage.getItem("camper_filters");
    return filters
      ? JSON.parse(filters)
      : {
          location: "",
          AC: false,
          automatic: false,
          kitchen: false,
          TV: false,
          bathroom: false,
          form: "",
        };
  } catch (error) {
    console.error("Error loading filters from localStorage:", error);
    return {
      location: "",
      AC: false,
      automatic: false,
      kitchen: false,
      TV: false,
      bathroom: false,
      form: "",
    };
  }
};

const saveFiltersToStorage = (filters) => {
  try {
    localStorage.setItem("camper_filters", JSON.stringify(filters));
  } catch (error) {
    console.error("Error saving filters to localStorage:", error);
  }
};

const initialState = {
  ...getFiltersFromStorage(),
  appliedFilters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
      saveFiltersToStorage({
        location: state.location,
        AC: state.AC,
        automatic: state.automatic,
        kitchen: state.kitchen,
        TV: state.TV,
        bathroom: state.bathroom,
        form: state.form,
      });
    },
    toggleEquipment: (state, action) => {
      const equipment = action.payload;
      state[equipment] = !state[equipment];
      saveFiltersToStorage({
        location: state.location,
        AC: state.AC,
        automatic: state.automatic,
        kitchen: state.kitchen,
        TV: state.TV,
        bathroom: state.bathroom,
        form: state.form,
      });
    },
    setVehicleType: (state, action) => {
      const newType = action.payload;
      state.form = state.form === newType ? "" : newType;
      saveFiltersToStorage({
        location: state.location,
        AC: state.AC,
        automatic: state.automatic,
        kitchen: state.kitchen,
        TV: state.TV,
        bathroom: state.bathroom,
        form: state.form,
      });
    },
    applyFilters: (state) => {
      const apiFilters = {};

      if (state.location.trim()) {
        apiFilters.location = state.location.trim();
      }
      if (state.AC) apiFilters.AC = true;
      if (state.automatic) apiFilters.transmission = "automatic";
      if (state.kitchen) apiFilters.kitchen = true;
      if (state.TV) apiFilters.TV = true;
      if (state.bathroom) apiFilters.bathroom = true;
      if (state.form) apiFilters.form = state.form;

      state.appliedFilters = apiFilters;
    },
    clearFilters: (state) => {
      state.location = "";
      state.AC = false;
      state.automatic = false;
      state.kitchen = false;
      state.TV = false;
      state.bathroom = false;
      state.form = "";
      state.appliedFilters = {};
      try {
        localStorage.removeItem("camper_filters");
      } catch (error) {
        console.error("Error clearing filters from localStorage:", error);
      }
    },
    setAllFilters: (state, action) => {
      const filters = action.payload;
      state.location = filters.location || "";
      state.AC = filters.AC || false;
      state.automatic = filters.transmission === "automatic";
      state.kitchen = filters.kitchen || false;
      state.TV = filters.TV || false;
      state.bathroom = filters.bathroom || false;
      state.form = filters.form || "";

      saveFiltersToStorage({
        location: state.location,
        AC: state.AC,
        automatic: state.automatic,
        kitchen: state.kitchen,
        TV: state.TV,
        bathroom: state.bathroom,
        form: state.form,
      });
    },
    loadFiltersFromStorage: (state) => {
      const savedFilters = getFiltersFromStorage();
      state.location = savedFilters.location;
      state.AC = savedFilters.AC;
      state.automatic = savedFilters.automatic;
      state.kitchen = savedFilters.kitchen;
      state.TV = savedFilters.TV;
      state.bathroom = savedFilters.bathroom;
      state.form = savedFilters.form;
    },
  },
});

export const {
  setLocation,
  toggleEquipment,
  setVehicleType,
  applyFilters,
  clearFilters,
  setAllFilters,
  loadFiltersFromStorage,
} = filtersSlice.actions;

export const selectCurrentFilters = (state) => ({
  location: state.filters.location,
  AC: state.filters.AC,
  automatic: state.filters.automatic,
  kitchen: state.filters.kitchen,
  TV: state.filters.TV,
  bathroom: state.filters.bathroom,
  form: state.filters.form,
});

export const selectAppliedFilters = (state) => state.filters.appliedFilters;

export default filtersSlice.reducer;

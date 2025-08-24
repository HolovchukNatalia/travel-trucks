import { createSlice } from "@reduxjs/toolkit";

const getFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
    return [];
  }
};

const initialState = {
  items: getFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const existingIndex = state.items.indexOf(camperId);

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(camperId);
      }

      try {
        localStorage.setItem("favorites", JSON.stringify(state.items));
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }
    },
    addToFavorites: (state, action) => {
      const camperId = action.payload;
      if (!state.items.includes(camperId)) {
        state.items.push(camperId);
        try {
          localStorage.setItem("favorites", JSON.stringify(state.items));
        } catch (error) {
          console.error("Error saving favorites to localStorage:", error);
        }
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.items = state.items.filter((id) => id !== camperId);
      try {
        localStorage.setItem("favorites", JSON.stringify(state.items));
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }
    },
    clearAllFavorites: (state) => {
      state.items = [];
      try {
        localStorage.removeItem("favorites");
      } catch (error) {
        console.error("Error clearing favorites from localStorage:", error);
      }
    },
    loadFavoritesFromStorage: (state) => {
      state.items = getFavoritesFromStorage();
    },
  },
});

export const {
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearAllFavorites,
  loadFavoritesFromStorage,
} = favoritesSlice.actions;

export const selectIsFavorite = (state, camperId) =>
  state.favorites.items.includes(camperId);

export const selectFavoriteIds = (state) => state.favorites.items;

export default favoritesSlice.reducer;

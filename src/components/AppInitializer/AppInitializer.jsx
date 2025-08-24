import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFiltersFromStorage } from "../../store/slices/filtersSlice";
import { loadFavoritesFromStorage } from "../../store/slices/favoritesSlice";

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFiltersFromStorage());
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);

  return children;
};

export default AppInitializer;

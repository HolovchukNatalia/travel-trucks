import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadFiltersFromStorage } from "../../store/slices/filtersSlice";
import { loadFavoritesFromStorage } from "../../store/slices/favoritesSlice";
import Loader from "../Loader/Loader.jsx";
import RouteList from "../../routes/AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFiltersFromStorage());
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);
  return (
    <Suspense fallback={<Loader />}>
      <RouteList />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
}

export default App;

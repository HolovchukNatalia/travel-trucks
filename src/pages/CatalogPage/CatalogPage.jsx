// pages/CatalogPage/CatalogPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  loadMoreCampers,
  resetCampers,
  clearError,
} from "../../store/slices/campersSlice";
import { loadFiltersFromStorage } from "../../store/slices/filtersSlice";
import { loadFavoritesFromStorage } from "../../store/slices/favoritesSlice";
import CamperCard from "../../components/CamperCard/CamperCard.jsx";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogPage.module.css";
import Button from "../../components/Button/Button.jsx";
import { store } from "../../store/index.js";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const {
    items: campers,
    loading,
    error,
    currentPage,
    hasMore,
  } = useSelector((state) => state.campers);

  const { appliedFilters } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(loadFiltersFromStorage());
    dispatch(loadFavoritesFromStorage());
    setTimeout(() => {
      const state = store.getState();
      const savedFilters = state.filters.appliedFilters || {};
      dispatch(fetchCampers({ page: 1, limit: 4, ...savedFilters }));
    }, 0);
  }, [dispatch]);

  const handleFilterChange = (newFilters) => {
    console.log("Applying new filters:", newFilters);
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit: 4, ...newFilters }));
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(
        loadMoreCampers({
          page: currentPage + 1,
          limit: 4,
          ...appliedFilters,
        })
      );
    }
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchCampers({ page: 1, limit: 4, ...appliedFilters }));
  };

  if (loading && campers.length === 0) {
    return <Loader />;
  }

  return (
    <div className={css.catalogPage}>
      <div className={css.container}>
        <FilterSidebar onFilterChange={handleFilterChange} loading={loading} />

        <div className={css.content}>
          {error && (
            <div className={css.error}>
              <p>Error loading campers: {error}</p>
              <button onClick={handleRetry} className={css.retryButton}>
                Try again
              </button>
            </div>
          )}

          {!error && campers.length === 0 && !loading && (
            <div className={css.noResults}>
              <p>No campers found matching your criteria.</p>
            </div>
          )}

          {campers.length > 0 && (
            <>
              <div className={css.campersList}>
                {campers.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>

              {hasMore && (
                <div className={css.loadMoreContainer}>
                  <Button
                    onClick={handleLoadMore}
                    loading={loading}
                    variant="primary"
                    className={css.loadMoreButton}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;

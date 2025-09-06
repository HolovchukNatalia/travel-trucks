import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchCampers,
  loadMoreCampers,
  resetCampers,
  clearError,
} from "../../store/slices/campersSlice";
import {
  loadFiltersFromUrl,
  selectAppliedFilters,
} from "../../store/slices/filtersSlice";
import { loadFavoritesFromStorage } from "../../store/slices/favoritesSlice";
import CamperCard from "../../components/CamperCard/CamperCard.jsx";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogPage.module.css";
import Button from "../../components/Button/Button.jsx";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    items: campers,
    loading,
    error,
    currentPage,
    hasMore,
  } = useSelector((state) => state.campers);

  const appliedFilters = useSelector(selectAppliedFilters);

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
    const filtersFromUrl = Object.fromEntries(searchParams.entries());
    dispatch(loadFiltersFromUrl(filtersFromUrl));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit: 4, ...appliedFilters }));
  }, [dispatch, appliedFilters]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams(newFilters);
    setSearchParams(params);
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
              <ul className={css.campersList}>
                {campers.map((camper) => (
                  <li key={camper.id} className={css.camperListItem}>
                    <CamperCard camper={camper} />
                  </li>
                ))}
              </ul>

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

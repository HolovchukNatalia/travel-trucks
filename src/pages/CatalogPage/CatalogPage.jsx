import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchCampers,
  resetCampers,
  clearError,
} from "../../store/slices/campersSlice";
import {
  setAllFilters,
  clearFilters as resetReduxFilters,
} from "../../store/slices/filtersSlice";
import CamperCard from "../../components/CamperCard/CamperCard.jsx";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogPage.module.css";
import Button from "../../components/Button/Button.jsx";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const {
    items: campers,
    loading,
    error,
    currentPage,
    hasMore,
  } = useSelector((state) => state.campers);
  const [searchParams, setSearchParams] = useSearchParams();

  // Функція для перетворення параметрів з URL в об'єкт фільтрів для Redux та API
  const getFiltersFromUrl = useCallback(() => {
    const urlFilters = {};
    const location = searchParams.get("location");
    if (location) urlFilters.location = location;

    const equipmentParam = searchParams.get("equipment");
    if (equipmentParam) {
      const equipmentKeys = equipmentParam.split(",");
      if (equipmentKeys.includes("AC")) urlFilters.AC = true;
      if (equipmentKeys.includes("automatic")) urlFilters.automatic = true;
      if (equipmentKeys.includes("kitchen")) urlFilters.kitchen = true;
      if (equipmentKeys.includes("TV")) urlFilters.TV = true;
      if (equipmentKeys.includes("bathroom")) urlFilters.bathroom = true;
    }

    const form = searchParams.get("form");
    if (form) urlFilters.form = form;

    return urlFilters;
  }, [searchParams]);

  // Цей хук реагує на зміни в URL. При зміні URL, він скидає стан і завантажує нові дані.
  useEffect(() => {
    const apiFilters = getFiltersFromUrl();
    dispatch(setAllFilters(apiFilters));
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit: 4, filters: apiFilters }));
  }, [dispatch, getFiltersFromUrl, searchParams]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const apiFilters = getFiltersFromUrl();
      dispatch(
        fetchCampers({ page: currentPage + 1, limit: 4, filters: apiFilters })
      );
    }
  };

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.location) {
      params.set("location", newFilters.location);
    }

    const equipment = [];
    if (newFilters.AC) equipment.push("AC");
    if (newFilters.automatic) equipment.push("automatic");
    if (newFilters.kitchen) equipment.push("kitchen");
    if (newFilters.TV) equipment.push("TV");
    if (newFilters.bathroom) equipment.push("bathroom");
    if (equipment.length > 0) {
      params.set("equipment", equipment.join(","));
    }

    if (newFilters.form) {
      params.set("form", newFilters.form);
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    dispatch(resetReduxFilters());
    setSearchParams({});
  };

  const handleRetry = () => {
    dispatch(clearError());
    const apiFilters = getFiltersFromUrl();
    dispatch(fetchCampers({ page: 1, limit: 4, filters: apiFilters }));
  };

  if (loading && campers.length === 0) {
    return <Loader />;
  }

  return (
    <div className={css.catalogPage}>
      <div className={css.container}>
        <FilterSidebar
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          loading={loading}
        />

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
                  <CamperCard key={camper._id} camper={camper} />
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

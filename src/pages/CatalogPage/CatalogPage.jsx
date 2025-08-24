import { useState, useEffect } from "react";
import { campersAPI } from "../../api/apiCampers.js";
import CamperCard from "../../components/CamperCard/CamperCard.jsx";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogPage.module.css";
import Button from "../../components/Button/Button.jsx";

const CatalogPage = () => {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 4;

  const loadCampers = async (page = 1, appliedFilters = {}, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit: ITEMS_PER_PAGE,
        ...appliedFilters,
      };

      const data = await campersAPI.getCampers(params);

      if (append) {
        setCampers((prev) => [...prev, ...data.items]);
      } else {
        setCampers(data.items);
      }

      setTotalItems(data.total);
      setHasMore(data.items.length === ITEMS_PER_PAGE);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
      console.error("Error loading campers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampers(1, filters);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    loadCampers(1, newFilters);
  };

  const loadMoreCampers = () => {
    if (hasMore && !loading) {
      loadCampers(currentPage + 1, filters, true);
    }
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
              <button
                onClick={() => loadCampers(1, filters)}
                className={css.retryButton}
              >
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
                    onClick={loadMoreCampers}
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

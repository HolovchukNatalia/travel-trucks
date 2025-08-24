import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Додано useLocation
import { campersAPI } from "../../api/apiCampers.js";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import CamperInfo from "../../components/CamperInfo/CamperInfo";
import CamperTabs from "../../components/CamperTabs/CamperTabs";
import FeaturesTab from "../../components/FeaturesTab/FeaturesTab";
import ReviewsTab from "../../components/RewiewsTab/RewiewsTab";
import BookingForm from "../../components/BookingForm/BookingForm";
import Loader from "../../components/Loader/Loader";
import css from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Використання useLocation
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Встановлення початкової вкладки на основі URL-хешу
  const [activeTab, setActiveTab] = useState(
    location.hash === "#reviews" ? "reviews" : "features"
  );

  useEffect(() => {
    // Встановлення вкладки при першому завантаженні або зміні URL-хешу
    if (location.hash) {
      setActiveTab(location.hash.substring(1));
    }

    const loadCamperDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await campersAPI.getCamperById(id);
        setCamper(data);
      } catch (err) {
        setError(err.message);
        console.error("Error loading camper details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCamperDetails();
    }
  }, [id, location.hash]); // Додано location.hash як залежність

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Оновлення URL-хешу при зміні вкладки
    navigate(
      { hash: tabId === "reviews" ? "#reviews" : "" },
      { replace: true }
    );
  };

  if (loading) {
    return <Loader loading={loading} size={60} color="#e44c2c" />;
  }

  if (error) {
    return (
      <div className={css.camperDetailsPage}>
        <div className={css.container}>
          <div className={css.errorContainer}>
            <div className={css.error}>
              <h2>Error loading camper details</h2>
              <p>{error}</p>
              <div className={css.errorActions}>
                <button
                  onClick={() => window.location.reload()}
                  className={css.retryButton}
                >
                  Try again
                </button>
                <button
                  onClick={() => navigate("/catalog")}
                  className={css.backButton}
                >
                  Back to catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!camper) {
    return (
      <div className={css.camperDetailsPage}>
        <div className={css.container}>
          <div className={css.errorContainer}>
            <div className={css.error}>
              <h2>Camper not found</h2>
              <p>The camper you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate("/catalog")}
                className={css.backButton}
              >
                Back to catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.camperDetailsPage}>
      <div className={css.container}>
        <CamperInfo camper={camper} />
        <ImageGallery gallery={camper.gallery} name={camper.name} />

        <div className={css.description}>
          <p>{camper.description}</p>
        </div>

        <div className={css.tabsNavigation}>
          <CamperTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        <div className={css.contentAndForm}>
          <div className={css.tabContentSection}>
            {activeTab === "features" && <FeaturesTab camper={camper} />}
            {activeTab === "reviews" && <ReviewsTab reviews={camper.reviews} />}
          </div>

          <div className={css.bookingSection}>
            <BookingForm camperId={camper.id} price={camper.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;

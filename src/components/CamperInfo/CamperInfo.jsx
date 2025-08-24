import { useState } from "react";
import css from "./CamperInfo.module.css";
import ratingIcon from "../../assets/icons/ratingAc.svg";
import locationIcon from "../../assets/icons/location.svg";

const CamperInfo = ({ camper }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { name, rating, location, price, reviews } = camper;
  const reviewCount = reviews ? reviews.length : 0;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `€${price.toFixed(2)}`;
    }
    return "—";
  };

  return (
    <div className={css.camperInfo}>
      <div className={css.header}>
        <h1 className={css.name}>{name}</h1>
        <button
          onClick={toggleFavorite}
          className={`${css.favoriteButton} ${isFavorite ? css.active : ""}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        ></button>
      </div>

      <div className={css.meta}>
        <div className={css.rating}>
          <img src={ratingIcon} alt="Rating" className={css.ratingIcon} />
          <span className={css.ratingValue}>{rating}</span>
          <span className={css.reviewCount}>({reviewCount} Reviews)</span>
        </div>

        <div className={css.location}>
          <img src={locationIcon} alt="Location" className={css.locationIcon} />
          <span>{location}</span>
        </div>
      </div>

      <div className={css.price}>
        <span className={css.priceValue}>{formatPrice(price)}</span>
      </div>
    </div>
  );
};

export default CamperInfo;

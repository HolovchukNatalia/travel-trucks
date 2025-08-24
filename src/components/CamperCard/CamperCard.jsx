import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  selectIsFavorite,
} from "../../store/slices/favoritesSlice";

import css from "./CamperCard.module.css";
import favourite from "../../assets/icons/favourite.svg";
import favouriteActive from "../../assets/icons/favouriteActive.svg";
import ratingAc from "../../assets/icons/ratingAc.svg";
import located from "../../assets/icons/location.svg";

// icons features
import automaticIcon from "../../assets/icons/automatic.svg";
import acIcon from "../../assets/icons/ac.svg";
import cupHotIcon from "../../assets/icons/cup-hot.svg";
import tvIcon from "../../assets/icons/tv.svg";
import radioIcon from "../../assets/icons/radio.svg";
import hugeiconsFridgeIcon from "../../assets/icons/hugeicons_gas-stove.svg";
import microwaveIcon from "../../assets/icons/lucide_microwave.svg";
import gasStoveIcon from "../../assets/icons/hugeicons_gas-stove.svg";
import ionWaterOutlineIcon from "../../assets/icons/ion_water-outline.svg";
import engineIcon from "../../assets/icons/group.svg";
import bathroomIcon from "../../assets/icons/ph_shower.svg";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, camper.id));

  const {
    id,
    name,
    price,
    rating,
    location,
    description,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    gallery,
    reviews,
  } = camper;

  const mainImage = gallery && gallery[0] ? gallery[0].thumb : "";
  const reviewCount = reviews ? reviews.length : 0;

  const formatPrice = (price) => `€${price.toFixed(2)}`;

  const getFeatures = () => {
    const features = [];

    if (transmission)
      features.push({
        key: "transmission",
        label: transmission,
        icon: automaticIcon,
      });
    if (engine)
      features.push({ key: "engine", label: engine, icon: engineIcon });
    if (AC) features.push({ key: "AC", label: "AC", icon: acIcon });
    if (bathroom)
      features.push({ key: "bathroom", label: "Bathroom", icon: bathroomIcon });
    if (kitchen)
      features.push({ key: "kitchen", label: "Kitchen", icon: cupHotIcon });
    if (TV) features.push({ key: "TV", label: "TV", icon: tvIcon });
    if (radio) features.push({ key: "radio", label: "Radio", icon: radioIcon });
    if (refrigerator)
      features.push({
        key: "refrigerator",
        label: "Refrigerator",
        icon: hugeiconsFridgeIcon,
      });
    if (microwave)
      features.push({
        key: "microwave",
        label: "Microwave",
        icon: microwaveIcon,
      });
    if (gas) features.push({ key: "gas", label: "Gas", icon: gasStoveIcon });
    if (water)
      features.push({
        key: "water",
        label: "Water",
        icon: ionWaterOutlineIcon,
      });

    return features;
  };

  const features = getFeatures();

  return (
    <div className={css.camperCard}>
      <div className={css.imageContainer}>
        {mainImage ? (
          <img src={mainImage} alt={name} className={css.camperImage} />
        ) : (
          <div className={css.imagePlaceholder}>
            <span>No image available</span>
          </div>
        )}
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <h3 className={css.name}>{name}</h3>
          <div className={css.priceContainer}>
            <span className={css.price}>{formatPrice(price)}</span>
            <button
              onClick={() => dispatch(toggleFavorite(camper.id))}
              className={`${css.favoriteButton} ${
                isFavorite ? css.active : ""
              }`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <img
                src={isFavorite ? favouriteActive : favourite}
                alt={isFavorite ? "Favorited" : "Not favorited"}
                className={css.heartIcon}
              />
            </button>
          </div>
        </div>

        <div className={css.rating}>
          <span className={css.ratingValue}>
            <img src={ratingAc} alt="star" />
            {rating}
          </span>
          <Link to={`/catalog/${id}#reviews`} className={css.reviewCountLink}>
            ({reviewCount} Reviews)
          </Link>
          <span className={css.location}>
            <img src={located} alt="" /> {location}
          </span>
        </div>

        <p className={css.description}>
          {description.length > 63
            ? `${description.substring(0, 63).trim()}...`
            : description}
        </p>

        <ul className={css.features}>
          {features.map((f) => (
            <li key={f.key} className={css.feature}>
              <img src={f.icon} alt="" className={css.icon} />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        <Link to={`/catalog/${id}`} className={css.showMoreButton}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;

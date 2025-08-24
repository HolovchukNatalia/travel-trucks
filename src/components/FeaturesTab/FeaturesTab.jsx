import css from "./FeaturesTab.module.css";
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

const FeaturesTab = ({ camper }) => {
  const {
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
    form,
    length,
    width,
    height,
    tank,
    consumption,
  } = camper;

  const getFeatures = () => {
    const features = [];

    if (transmission)
      features.push({
        key: "transmission",
        label: transmission,
        icon: automaticIcon,
      });

    if (engine)
      features.push({
        key: "engine",
        label: engine,
        icon: engineIcon,
      });

    if (AC)
      features.push({
        key: "AC",
        label: "AC",
        icon: acIcon,
      });

    if (bathroom)
      features.push({
        key: "bathroom",
        label: "Bathroom",
        icon: bathroomIcon,
      });

    if (kitchen)
      features.push({
        key: "kitchen",
        label: "Kitchen",
        icon: cupHotIcon,
      });

    if (TV)
      features.push({
        key: "TV",
        label: "TV",
        icon: tvIcon,
      });

    if (radio)
      features.push({
        key: "radio",
        label: "Radio",
        icon: radioIcon,
      });

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

    if (gas)
      features.push({
        key: "gas",
        label: "Gas",
        icon: gasStoveIcon,
      });

    if (water)
      features.push({
        key: "water",
        label: "Water",
        icon: ionWaterOutlineIcon,
      });

    return features;
  };

  const features = getFeatures();

  const vehicleDetails = [
    { label: "Form", value: form || "N/A" },
    { label: "Length", value: length || "N/A" },
    { label: "Width", value: width || "N/A" },
    { label: "Height", value: height || "N/A" },
    { label: "Tank", value: tank || "N/A" },
    { label: "Consumption", value: consumption || "N/A" },
  ];

  return (
    <div className={css.featuresTab}>
      <div className={css.featuresSection}>
        <ul className={css.featuresList}>
          {features.map((feature) => (
            <li key={feature.key} className={css.featureItem}>
              <img src={feature.icon} alt="" className={css.featureIcon} />
              <span className={css.featureLabel}>{feature.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={css.detailsSection}>
        <h3 className={css.detailsTitle}>Vehicle details</h3>
        <div className={css.detailsList}>
          {vehicleDetails.map((detail, index) => (
            <div key={index} className={css.detailItem}>
              <span className={css.detailLabel}>{detail.label}</span>
              <span className={css.detailValue}>{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesTab;

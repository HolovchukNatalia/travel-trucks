import { useState } from "react";
import css from "./FilterSidebar.module.css";
import FilterButton from "../FilterButton/FilterButton.jsx";
import Button from "../Button/Button.jsx";

import acIcon from "../../assets/icons/ac.svg";
import locationIcon from "../../assets/icons/location.svg";
import automaticIcon from "../../assets/icons/automatic.svg";
import kitchenIcon from "../../assets/icons/cup-hot.svg";
import tvIcon from "../../assets/icons/tv.svg";
import bathroomIcon from "../../assets/icons/ph_shower.svg";
import vanIcon from "../../assets/icons/bi_grid-1x2.svg";
import integratedIcon from "../../assets/icons/bi_grid.svg";
import alcoveIcon from "../../assets/icons/bi_grid-3x3-gap.svg";

const equipmentOptions = [
  { key: "AC", label: "AC", icon: acIcon },
  { key: "automatic", label: "Automatic", icon: automaticIcon },
  { key: "kitchen", label: "Kitchen", icon: kitchenIcon },
  { key: "TV", label: "TV", icon: tvIcon },
  { key: "bathroom", label: "Bathroom", icon: bathroomIcon },
];

const vehicleTypes = [
  { key: "panelTruck", label: "Van", icon: vanIcon },
  { key: "integrated", label: "Fully Integrated", icon: integratedIcon },
  { key: "alcove", label: "Alcove", icon: alcoveIcon },
];

const FilterSidebar = ({ onFilterChange, loading }) => {
  const [filters, setFilters] = useState({
    location: "",
    AC: false,
    automatic: false,
    kitchen: false,
    TV: false,
    bathroom: false,
    form: "",
  });

  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handleEquipmentChange = (equipment) => {
    setFilters({ ...filters, [equipment]: !filters[equipment] });
  };

  const handleVehicleTypeChange = (type) => {
    setFilters({
      ...filters,
      form: filters.form === type ? "" : type,
    });
  };

  const handleSearch = () => {
    const apiFilters = {};

    if (filters.location.trim()) apiFilters.location = filters.location.trim();
    if (filters.AC) apiFilters.AC = true;
    if (filters.automatic) apiFilters.transmission = "automatic";
    if (filters.kitchen) apiFilters.kitchen = true;
    if (filters.TV) apiFilters.TV = true;
    if (filters.bathroom) apiFilters.bathroom = true;
    if (filters.form) apiFilters.form = filters.form;

    onFilterChange(apiFilters);
  };

  const clearFilters = () => {
    const cleared = {
      location: "",
      AC: false,
      automatic: false,
      kitchen: false,
      TV: false,
      bathroom: false,
      form: "",
    };
    setFilters(cleared);
    onFilterChange({});
  };

  return (
    <div className={css.filterSidebar}>
      <div className={css.filterSection}>
        <label className={css.filterLabel}>Location</label>
        <div className={css.locationInput}>
          <span className={css.locationIcon}>
            <img src={locationIcon} alt="" />
          </span>
          <input
            type="text"
            placeholder="City"
            value={filters.location}
            onChange={handleLocationChange}
            className={css.locationField}
          />
        </div>
      </div>

      <div className={css.divider}>Filters</div>

      <div className={css.filterSection}>
        <h3 className={css.sectionTitle}>Vehicle equipment</h3>
        <div className={css.equipmentGrid}>
          {equipmentOptions.map(({ key, label, icon }) => (
            <FilterButton
              key={key}
              active={filters[key]}
              onClick={() => handleEquipmentChange(key)}
              icon={icon}
              label={label}
            />
          ))}
        </div>
      </div>

      <div className={css.filterSection}>
        <h3 className={css.sectionTitle}>Vehicle type</h3>
        <div className={css.vehicleTypeGrid}>
          {vehicleTypes.map(({ key, label, icon }) => (
            <FilterButton
              key={key}
              active={filters.form === key}
              onClick={() => handleVehicleTypeChange(key)}
              icon={icon}
              label={label}
            />
          ))}
        </div>
      </div>

      <div className={css.actionButtons}>
        <Button onClick={handleSearch} loading={loading}>
          Search
        </Button>

        <Button onClick={clearFilters} variant="secondary">
          Clear filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;

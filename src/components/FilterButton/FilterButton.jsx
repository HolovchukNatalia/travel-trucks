import css from "./FilterButton.module.css";

const FilterButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      className={`${css.filterButton} ${active ? css.active : ""}`}
      onClick={onClick}
    >
      <span className={css.iconWrapper}>
        <img src={icon} alt={label} />
      </span>
      <span>{label}</span>
    </button>
  );
};

export default FilterButton;

import css from "./CamperTabs.module.css";

const CamperTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className={css.camperTabs}>
      <div className={css.tabNav}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${css.tabButton} ${
              activeTab === tab.id ? css.active : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CamperTabs;

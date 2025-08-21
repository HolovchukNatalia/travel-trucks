import { useNavigate } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewCatalog = () => {
    navigate("/catalog");
  };
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <div className={css.content}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.text}>
            You can find everything you want in our catalog
          </p>
          <button className={css.button} onClick={handleViewCatalog}>
            View Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

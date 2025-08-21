import css from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading = true, size = 50, color = "#2a2a2ab3" }) => {
  return (
    <div className={css.loaderContainer}>
      <ClipLoader size={size} color={color} loading={loading} />
    </div>
  );
};

export default Loader;

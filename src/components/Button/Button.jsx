import css from "./Button.module.css";

const Button = ({
  onClick,
  loading = false,
  children,
  variant = "primary",
  ...props
}) => {
  const className = variant === "primary" ? css.searchButton : css.clearButton;

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={className}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;

import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404</h1>
      <p className={css.message}>Oops... Page not found</p>
      <a href="/" className={css.link}>
        Return to home page
      </a>
    </div>
  );
};

export default NotFoundPage;

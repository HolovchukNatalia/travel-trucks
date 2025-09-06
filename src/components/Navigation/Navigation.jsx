import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import logo from "../../assets/icons/logo.svg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link to="/">
          <img src={logo} alt="Logo" className={css.logo} />
        </Link>

        <nav className={css.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Catalog
          </NavLink>
        </nav>

        <div
          className={`${css.burger} ${isOpen ? css.open : ""}`}
          onClick={toggleMenu}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav className={`${css.mobileNav} ${isOpen ? css.open : ""}`}>
          <NavLink
            onClick={toggleMenu}
            to="/"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Home
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="/catalog"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

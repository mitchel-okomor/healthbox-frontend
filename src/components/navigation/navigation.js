import React, { useContext } from "react";
import "./navigation.css";
import { Link, useLocation } from "react-router-dom";
import { myContext } from "../../App";

function Navigation() {
  const locus = useLocation();

  const toggleNav = () => {
    const navBar = document.getElementById("nav-bar");
    navBar.style.display === "block"
      ? (navBar.style.display = "none")
      : (navBar.style.display = "block");
  };

  const { state } = useContext(myContext);
  const { user } = state;

  return (
    <nav className="pr-5 navbar ">
      <button onClick={toggleNav} className="btn hide">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>
      <ul className="justify-content-center w-100" id="nav-bar">
        <li>
          <Link
            to="/"
            className={`${locus.pathname === "/" ? "active" : ""} `}
            id="my-first-step"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className={locus.pathname === "/contact" ? "active" : ""}
          >
            Contact
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className={locus.pathname === "/about" ? "active" : ""}
          >
            About
          </Link>
        </li>
        {user ? (
          <li>
            <Link
              to="/profile"
              className={locus.pathname === "/profile" ? "active" : ""}
            >
              Prescriptions
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

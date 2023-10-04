import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../store/reducers/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.scss";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const isNavbarVisible = !location.pathname.startsWith("/decks/") && (!location.pathname.startsWith("/study/") || !location.pathname.startsWith("/review/"));
  if (!isNavbarVisible) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    Cookies.remove("authToken");
    window.location.href = "/";
  };

  return (
    <ul className="navbar-container">
      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Home
      </Link>
      {user ? (
        <>
          <Link to="/create">
            <FontAwesomeIcon icon={faPlus} /> Create
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
            {user.username}
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </ul>
  );
};

export default Navbar;

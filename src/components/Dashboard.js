import axios from "axios";
import React, { useContext, useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import SearchIcon from "@material-ui/icons/Search";
import Messages from "./Messages";
import Notifications from "./Notifications";

const Dashboard = () => {
  let history = useHistory();
  const { authValue, userValue, loginValue } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = loginValue;
  const [email, setEmail] = useState("");

  const handleLogoutAll = async () => {
    await axios.post("/users/logoutAll", {
      message: "All accounts were logged out!",
    });
    setIsLoggedIn(false);
  };

  const handleLogout = async () => {
    await axios.post("/users/logout", {
      message: "You were Logged out!",
    });
    
    history.push("/");
    setIsLoggedIn(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("/users/findByEmail", {
        email,
      });
      console.log(user);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="dashboard">
      <nav className="navbar navbar-expand-md navbar-light bg-light p-2">
        <a href="/" className="navbar-brand">
          Social Media
        </a>
        <div style = {{width: '100%'}} >
          <form className="search__form">
            <input
              className="form-control form__input"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              type="submit"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLinks"
          aria-controls="navbarLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarLinks">
          <ul className="navbar-nav d-flex justify-content-evenly navigation__links">
            <li className="nav-item">
              <Link className="navigation__items" to="/messages">
                M
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navigation__items" to="/notifications">
                N
              </Link>
            </li>
          </ul>

          <button className="logout__btn" onClick={handleLogout}>
            Logout
          </button>

          {/* <button className="logout__btn" onClick={handleLogoutAll}>
            Logout of all devices
          </button> */}
        </div>
      </nav>

      <Switch>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
      </Switch>

      <div className="dashboard__search_div"></div>
    </div>
  );
};

export default Dashboard;

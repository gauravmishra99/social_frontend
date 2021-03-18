import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Login.css";
import { IconButton } from "@material-ui/core";
import { UserContext } from "./context/UserContext";

import { Visibility, VisibilityOff } from "@material-ui/icons";

const Login = ({ setIsClicked }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTrue, setIsTrue] = useState(false);

  const { authValue, userValue, loginValue } = useContext(UserContext);
  const [authToken, setAuthToken] = authValue;
  const [user, setUser] = userValue;
  const [isLoggedIn, setIsLoggedIn] = loginValue;

  const submitHandler = async (e) => {
    setIsTrue(true);
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });
      setUser(response.data.user);
      setAuthToken(response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      alert("Please check the credentials");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <div className="login">
      <div className="login__container">
        <p className="login__heading mb-3 justify-content-center">Login</p>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmail}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>

            <div className="password__div">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={handlePassword}
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                className="password__visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <button
              disabled={isTrue ? true : false}
              type="submit"
              className="btn btn-primary ml-auto mr-auto"
            >
              LogIn
            </button>
            <a className="signup__btn" onClick={handleClick}>
              SignUp
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import "./Login.css";

const Signup = ({ setIsClicked }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTrue, setIsTrue] = useState(false);

  const { authValue, userValue, loginValue } = useContext(UserContext);
  const [authToken, setAuthToken] = authValue;
  const [user, setUser] = userValue;
  const [isLoggedIn, setIsLoggedIn] = loginValue;

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
    setIsClicked(false);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSignUp = async (e) => {
    setIsTrue(true);
    e.preventDefault();
    try {
      const user = {
        name,
        email,
        password,
      };
      const response = await axios.post("/users", user);
      // if (typeof Storage !== "undefined") {
      //   localStorage.setItem("JWT", response.data.token);
      // }
      setUser(response.data.user);
      setAuthToken(response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <p className="login__heading mb-3 justify-content-center">SignUp</p>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleName}
            />
          </div>
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
              Remember Me
            </label>
          </div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <button
              disabled={isTrue ? true : false}
              type="submit"
              className="btn btn-primary ml-auto mr-auto"
            >
              SignUp
            </button>
            <a className="signup__btn" onClick={handleClick}>
              LogIn
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

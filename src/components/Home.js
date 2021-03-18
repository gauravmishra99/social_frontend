import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./Home.css";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

const Home = ( {setIsLoading} ) => {
  return (
    <div>
      <Dashboard />
      <Profile />
    </div>
  );
};

export default Home;

import "./App.css";
import { useContext, useEffect, useState } from "react";
import Login from "./components/Login";
import { UserContext } from "./components/context/UserContext";
import Signup from "./components/Signup";
import Home from "./components/Home";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { loginValue, authValue } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = loginValue;
  const [authToken, setAuthToken] = authValue;
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const DecodeJWT = async () => {
    try {
      const response = await axios.post("/users/decode");
      if (response.data === true) {
        setIsLoggedIn(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } else {
        setIsLoggedIn(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      alert("Facing some Problem at server end");
    }
  };

  useEffect(() => {
    DecodeJWT();
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <div className="loading">
          <h1>Loading....</h1>
        </div>
      ) : (
        <div className="body">
          {!isLoggedIn && isClicked && <Signup setIsClicked={setIsClicked} />}
          {!isLoggedIn && !isClicked && <Login setIsClicked={setIsClicked} />}
          {isLoggedIn && (
            <Router>
              <Home />
            </Router>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        authValue: [authToken, setAuthToken],
        userValue: [user, setUser],
        loginValue: [isLoggedIn, setIsLoggedIn],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

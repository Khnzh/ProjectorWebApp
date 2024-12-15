import React, { createContext, useState, useContext, useReducer } from "react";

// Create the Auth context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "define_quals": {
          return { ...state, qualifications: action.payload };
        }
      }
      switch (action.type) {
        case "define_pId": {
          return { ...state, pId: action.payload };
        }
      }
    },
    {
      qualifications: [],
      pId: "",
    }
  ); // default to not authenticated

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useState, useContext } from "react";

// Create the Auth context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default to not authenticated

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

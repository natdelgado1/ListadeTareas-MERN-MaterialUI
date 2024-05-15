import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
// Create the UserProvider component
export const UserProvider = ({ children }) => {
  // Define the state for user session
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null && storedUser !== "null" && storedUser !== "" && storedUser !== undefined) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
  }, [user]);

  // Define functions to manage the user session
  const login = (userData) => {
    setLoading(true)
    // Perform login logic here
    setUser(userData);
    saveUserToLocalStorage(userData);
    setLoading(false)
  };

  const logout = () => {
    // Perform logout logic here
    setUser(null);
    removeUserFromLocalStorage();
  };

  // Function to save user data to localStorage
  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Function to remove user data from localStorage
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  // Provide the user session state and functions to the children components
  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

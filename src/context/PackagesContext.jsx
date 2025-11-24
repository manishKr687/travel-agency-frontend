import React, { createContext, useState, useEffect, useContext } from "react";
import { getPackages } from "../api/packages"; // Assuming getPackages fetches all packages

const PackagesContext = createContext(null);

export const PackagesProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        setLoading(true);
        const data = await getPackages(); // getPackages should handle SITE_MODE internally
        setPackages(data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch all packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPackages();
  }, []);

  return (
    <PackagesContext.Provider value={{ packages, loading, error }}>
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackages = () => {
  const context = useContext(PackagesContext);
  if (!context) {
    throw new Error("usePackages must be used within a PackagesProvider");
  }
  return context;
};

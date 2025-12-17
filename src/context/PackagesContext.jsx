import React, { createContext, useState, useEffect, useContext } from "react";
import { getPackages } from "../api/packages"; 
import { SITE_MODE } from "../api/packages"; // assuming SITE_MODE exported

const PackagesContext = createContext(null);

export const PackagesProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStaticPackages = async () => {
      try {
        const res = await fetch("/packages.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load static packages.json");
        const data = await res.json();

        setPackages(data);
        setLoading(false);
      } catch (err) {
        console.error("Static mode package load failed:", err);
        setError(err);
        setLoading(false);
      }
    };

    const loadDynamicPackages = async () => {
      try {
        const data = await getPackages(); // expects API fetch
        setPackages(data);
        setLoading(false);
      } catch (err) {
        console.error("Dynamic package load failed:", err);
        setError(err);
        setLoading(false);
      }
    };

    // Switch based on MODE
    SITE_MODE === "static" ? loadStaticPackages() : loadDynamicPackages();
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
    throw new Error("usePackages must be used inside a PackagesProvider");
  }
  return context;
};

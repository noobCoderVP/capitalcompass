'use client';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context with a default value of null
export const StockContext = createContext(null);

// Create a provider component
export const StockProvider = ({ children }) => {
  const [stockDetails, setStockDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stock details from API
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEPATH}/stock/all`);
        console.log(response.data);
        setStockDetails(response.data.data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStockDetails();
  }, []);

  // Provide stock details and loading/error states to context consumers
  return (
    <StockContext.Provider value={{ stockDetails, loading, error }}>
      {children}
    </StockContext.Provider>
  );
};

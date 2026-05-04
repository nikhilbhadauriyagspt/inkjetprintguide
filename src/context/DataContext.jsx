import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import API_BASE_URL from '../config';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, setState] = useState({
    categories: [],
    brands: [],
    featuredProducts: [],
    loading: true,
    error: null
  });

  const fetchStarted = useRef(false);

  useEffect(() => {
    if (fetchStarted.current) return;
    fetchStarted.current = true;

    const fetchAllData = async () => {
      try {
        const [catRes, brandRes, prodRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json()),
          fetch(`${API_BASE_URL}/products?limit=80`).then(r => r.json())
        ]);

        setState({
          categories: catRes.status === 'success' ? catRes.data : [],
          brands: brandRes.status === 'success' ? brandRes.data : [],
          featuredProducts: prodRes.status === 'success' ? prodRes.data : [],
          loading: false,
          error: null
        });
      } catch (err) {
        console.error('Global Fetch Error:', err);
        setState(prev => ({ ...prev, loading: false, error: err.message }));
      }
    };

    fetchAllData();
  }, []);

  return (
    <DataContext.Provider value={state}>
      {children}
    </DataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useGlobalData must be used within DataProvider');
  return context;
};

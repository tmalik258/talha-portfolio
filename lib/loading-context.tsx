"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  addLoadingItem: (id: string) => void;
  removeLoadingItem: (id: string) => void;
  loadingItems: Set<string>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set(['initial-load']));
  const [isLoading, setIsLoading] = useState(true);

  const addLoadingItem = useCallback((id: string) => {
    setLoadingItems(prev => new Set([...prev, id]));
  }, []);

  const removeLoadingItem = useCallback((id: string) => {
    setLoadingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  // Update loading state based on items
  useEffect(() => {
    const hasLoadingItems = loadingItems.size > 0;
    if (hasLoadingItems !== isLoading) {
      if (!hasLoadingItems) {
        // Add a small delay before hiding loader for better UX
        setTimeout(() => setIsLoading(false), 800);
      } else {
        setIsLoading(true);
      }
    }
  }, [loadingItems, isLoading]);

  // Initialize with minimum loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      removeLoadingItem('initial-load');
    }, 2000); // Minimum 2 seconds loading time

    return () => clearTimeout(timer);
  }, [removeLoadingItem]);

  return (
    <LoadingContext.Provider value={{ isLoading, addLoadingItem, removeLoadingItem, loadingItems }}>
      {children}
    </LoadingContext.Provider>
  );
}

"use client"
import { useState } from "react";
import { createContext } from "react";

export const FilterContext = createContext({
    filters: { date: 1, status: "all" },
    updateFilters: () => {},
  });
const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({ date: 1, status: "all" });
  const updateFilters = (newFilter) => {
    setFilters(newFilter);
  };
  return (
    <FilterContext.Provider value={{filters, updateFilters}}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

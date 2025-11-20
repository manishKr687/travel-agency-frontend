import React from 'react';
import { Filter } from 'lucide-react';

const PACKAGE_TYPES = ["Luxury", "Premium", "Standard", "Budget"];
const THEMES = ["Relaxation", "City Break", "Adventure", "Nature", "Romance"];
const LOCATIONS = ["Indonesia", "Japan", "Switzerland", "Brazil", "Italy", "Morocco"];

const FilterSidebar = ({ filters, setFilters, onApply }) => {
  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const handleClear = () => {
    setFilters({ type: [], theme: [], location: [] });
  };

  const FilterGroup = ({ title, options, filterKey }) => (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">{title}</h4>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option} className="flex items-center text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[filterKey].includes(option)}
              onChange={() => handleChange(filterKey, option)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="ml-3 text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-teal-600 flex items-center">
          <Filter className="w-6 h-6 mr-2" />
          Filters
        </h3>
        <button onClick={handleClear} className="text-sm font-semibold text-red-500 hover:text-red-700 transition">
          Clear All
        </button>
      </div>

      <FilterGroup title="Package Type" options={PACKAGE_TYPES} filterKey="type" />
      <FilterGroup title="Theme" options={THEMES} filterKey="theme" />
      <FilterGroup title="Location" options={LOCATIONS} filterKey="location" />

      <button
        onClick={onApply}
        className="mt-6 w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition duration-300 shadow-lg"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
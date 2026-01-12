/**
 * @file PackageListingPage.jsx
 * @description This file contains the main page component for displaying and filtering travel packages.
 * 
 * @component PackageListingPage
 * @summary Renders a searchable and filterable grid of travel packages.
 * 
 * @functionalities
 * 1.  **Data Consumption**: It receives the master list of `packages` and a `loading` state from a parent route via the `useOutletContext` hook. It does not fetch data directly.
 * 
 * 2.  **State Management**:
 *     - `searchTerm`: Manages the text value of the main search input field.
 *     - `filters`: An object that holds the criteria selected by the user in the `FilterPanel` component (e.g., package type, theme, country, state, city).
 *     - `isFilterOpen`: A boolean state to toggle the visibility of the filter panel on mobile devices.
 * 
 * 3.  **Advanced Filtering**:
 *     - The component uses the `useMemo` hook to create a `filteredPackages` array. This is an optimization that ensures the complex filtering logic only re-runs when the `packages`, `filters`, or `searchTerm` change.
 *     - The filtering logic matches the `searchTerm` against multiple package properties (name, location).
 *     - It further refines the list based on the active `filters` selected in the `FilterPanel`.
 * 
 * 4.  **UI Rendering**:
 *     - Displays a main search bar and a "Filters" button (for mobile).
 *     - Renders the `FilterPanel` component, providing it with the necessary state and state setters to function.
 *     - Conditionally renders the main content area:
 *       a. **Loading State**: Shows a grid of animated skeleton loaders while the package data is being fetched.
 *       b. **Results State**: If there are filtered packages, it maps over the `filteredPackages` array and renders a `PackageCard` for each item.
 *       c. **Empty State**: If no packages match the current search and filter criteria, it displays a "No Packages Found" message with a convenient "Reset Filters" button.
 * 
 * @children
 * - `PackageCard`: Renders the individual card for each travel package.
 * - `FilterPanel`: Renders the sidebar with various filtering options.
 */
import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import PackageCard from "../components/PackageCard";
import FilterPanel from "../components/FilterPanel"; // NEW COMPONENT

const PackageListingPage = () => {
  const { packages, loading } = useOutletContext();

    const [filters, setFilters] = useState({
      type: [],
      theme: [],
      country: [],
      state: '',
      city: '',
    });
  
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
  
    // FILTER LOGIC
    const filteredPackages = useMemo(() => {
      if (loading || !packages) return [];
  
      return packages.filter((pkg) => {
        const locPartsRaw = pkg.location.split(', ').map(part => part.trim());
        const cityRaw = locPartsRaw[0];
        const stateRaw = locPartsRaw.length > 2 ? locPartsRaw[1] : null;
        const countryRaw = locPartsRaw.length > 1 ? locPartsRaw[locPartsRaw.length - 1] : locPartsRaw[0];
  
        const city = cityRaw.toLowerCase();
        const state = stateRaw ? stateRaw.toLowerCase() : null;
        const country = countryRaw.toLowerCase();
  
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const matchesSearch =
          pkg.name.toLowerCase().includes(lowercasedSearchTerm) ||
          city.includes(lowercasedSearchTerm) ||
          (state && state.includes(lowercasedSearchTerm)) ||
          country.includes(lowercasedSearchTerm);
  
        if (!matchesSearch) return false;
  
        const matchesType =
          filters.type.length === 0 ||
          filters.type.some(t => pkg.type.includes(t));
  
        const matchesTheme =
          filters.theme.length === 0 || filters.theme.some(t => pkg.theme.includes(t));
  
        const matchesCountry =
          filters.country.length === 0 ||
          filters.country.includes(countryRaw);
        
        const matchesState = !filters.state || (stateRaw && filters.state === stateRaw);
  
        const matchesCity = !filters.city || (filters.city === cityRaw);
  
        return matchesType && matchesTheme && matchesCountry && matchesState && matchesCity;
      });
    }, [filters, searchTerm, packages, loading]);
  return (
    <main className="min-h-screen bg-gray-50 font-body pt-28 pb-16">
      {/* PAGE HEADER */}
      <section className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-heading text-secondary font-bold mb-3">
          Discover Our Premium Packages
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Handpicked experiences crafted for comfort, luxury, and unforgettable journeys.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEARCH + FILTER BUTTON */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages, destinations, themes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm bg-white/70 backdrop-blur focus:ring-primary focus:border-primary transition"
            />
          </div>

          {/* FILTER BUTTON (Mobile Only) */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* FILTER PANEL */}
          <aside className="lg:w-1/4">
            {/* Desktop (always visible), Mobile (slide-in) */}
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApply={() => setIsFilterOpen(false)}
              packages={packages}
            />
          </aside>

          {/* PACKAGE RESULTS */}
          <section className="lg:w-3/4">
            {loading ? (
              /* LOADING SKELETONS */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl shadow-md h-64" />
                ))}
              </div>
            ) : filteredPackages.length > 0 ? (
              /* PACKAGE GRID */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} packageItem={pkg} />
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="text-center py-16 bg-white shadow-xl rounded-2xl max-w-lg mx-auto">
                <X className="w-14 h-14 text-red-400 mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-secondary">
                  No Packages Found
                </h3>
                <p className="text-gray-600 mt-2 max-w-sm mx-auto">
                  Try adjusting your search or filters.
                </p>
                                <button
                                  onClick={() => {
                                    setFilters({ type: [], theme: [], country: [], state: '', city: '' });
                                    setSearchTerm("");
                                  }}
                                  className="mt-5 px-6 py-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition"
                                >                  Reset Filters
                </button>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
};

export default PackageListingPage;
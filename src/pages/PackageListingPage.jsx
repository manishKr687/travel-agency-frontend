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
    location: [],
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // FILTER LOGIC
  const filteredPackages = useMemo(() => {
    if (loading || !packages) return [];

    return packages.filter((pkg) => {
      const name = pkg.name?.toLowerCase() || "";
      const loc = pkg.location?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();

      const matchesSearch = name.includes(term) || loc.includes(term);
      if (!matchesSearch) return false;

      const matchesType =
        filters.type.length === 0 || filters.type.includes(pkg.type);

      const matchesTheme =
        filters.theme.length === 0 || filters.theme.includes(pkg.theme);

      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.includes(pkg.location);

      return matchesType && matchesTheme && matchesLocation;
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
                    setFilters({ type: [], theme: [], location: [] });
                    setSearchTerm("");
                  }}
                  className="mt-5 px-6 py-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition"
                >
                  Reset Filters
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

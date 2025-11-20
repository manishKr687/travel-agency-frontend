import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import FilterSidebar from '../components/FilterSidebar';

const PackageListingPage = () => {
  const { MOCK_PACKAGES } = useOutletContext();
  const [filters, setFilters] = useState({ type: [], theme: [], location: [] });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering Logic using useMemo for performance
  const filteredPackages = useMemo(() => {
    return MOCK_PACKAGES.filter(pkg => {
      // 1. Search Term Filter
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Type Filter
      const matchesType = filters.type.length === 0 || filters.type.includes(pkg.type);

      // 3. Theme Filter
      const matchesTheme = filters.theme.length === 0 || filters.theme.includes(pkg.theme);

      // 4. Location Filter
      const matchesLocation = filters.location.length === 0 || filters.location.includes(pkg.location);

      return matchesType && matchesTheme && matchesLocation;
    });
  }, [filters, searchTerm, MOCK_PACKAGES]);

  // Handler for applying mobile filters
  const handleApplyMobileFilters = () => {
    setMobileFilterOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 font-inter py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Our Exclusive Travel Packages</h2>

      {/* Search and Mobile Filter Toggle */}
      <div className="mb-6 flex space-x-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search packages or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 transition duration-150"
          />
        </div>
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden p-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-300 flex items-center"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} onApply={() => {}} />
        </div>

        {/* Package Results */}
        <div className="lg:w-3/4">
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} packageItem={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-xl shadow-lg">
              <X className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700">No packages found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try clearing some filters or changing your search term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center lg:hidden">
          <div className="bg-white rounded-lg shadow-xl p-4 w-11/12 max-w-md">
            <FilterSidebar filters={filters} setFilters={setFilters} onApply={handleApplyMobileFilters} />
          </div>
        </div>
      )}
    </main>
  );
};

export default PackageListingPage;
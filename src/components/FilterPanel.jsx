import React from "react";
import { X } from "lucide-react";

const FilterPanel = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  onApply,
}) => {
  const types = ["Luxury", "Premium", "Standard"];
  const themes = ["Adventure", "Romantic", "Family", "Nature", "Religious"];
  const locations = ["Goa", "Manali", "Jaipur", "Udaipur", "Kerala", "Dubai"];

  const handleToggle = (category, value) => {
    setFilters((prev) => {
      const exists = prev[category].includes(value);
      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });
  };

  return (
    <>
      {/* BACKDROP (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
          onClick={onClose}
        ></div>
      )}

      {/* PANEL */}
      <div
        className={`fixed lg:static top-0 right-0 h-full lg:h-auto w-80 lg:w-full 
        bg-white/80 backdrop-blur-xl shadow-2xl lg:shadow-none 
        border-l border-gray-200 lg:border-none
        p-6 z-50 overflow-y-auto rounded-l-3xl lg:rounded-none
        transition-all duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
      >
        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-2xl font-heading font-bold text-secondary">Filters</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-700 hover:text-secondary transition" />
          </button>
        </div>

        {/* PANEL CONTENT */}
        <div className="space-y-8">

          {/* SECTION TEMPLATE */}
          {[
            { title: "Package Type", key: "type", values: types },
            { title: "Themes", key: "theme", values: themes },
            { title: "Locations", key: "location", values: locations },
          ].map((section) => (
            <div
              key={section.key}
              className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold text-secondary mb-3">
                {section.title}
              </h4>

              <div className="space-y-3">
                {section.values.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    {/* CUSTOM CHECKBOX */}
                    <div className="relative w-5 h-5">
                      <input
                        type="checkbox"
                        checked={filters[section.key].includes(item)}
                        onChange={() => handleToggle(section.key, item)}
                        className="peer w-5 h-5 opacity-0 absolute inset-0 cursor-pointer"
                      />
                      {/* Checkbox circle */}
                      <div
                        className="w-5 h-5 rounded-md border border-gray-400 
                        peer-checked:border-primary peer-checked:bg-primary 
                        transition"
                      ></div>
                      {/* Checkmark */}
                      <svg
                        className="absolute top-0 left-0 w-5 h-5 text-white opacity-0 
                        peer-checked:opacity-100 transition"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <span className="text-gray-800 group-hover:text-secondary transition font-medium">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-10">
          <button
            onClick={onApply}
            className="flex-1 bg-secondary text-white py-3 rounded-xl font-semibold 
            shadow-md hover:bg-secondary/90 transition"
          >
            Apply Filters
          </button>

          <button
            onClick={() => setFilters({ type: [], theme: [], location: [] })}
            className="flex-1 border border-gray-300 py-3 rounded-xl text-gray-700 
            hover:bg-gray-100 hover:text-secondary transition"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;

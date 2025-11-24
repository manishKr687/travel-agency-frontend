import React from "react";
import { useOutletContext } from "react-router-dom";
import FeaturedPackages from "../components/home/FeaturedPackages";
import Hero from "../components/home/Hero";
// import SearchBar from "../components/home/SearchBar";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs";

const HomePage = () => {
  const { packages = [], loading } = useOutletContext();

  return (
    <main className="min-h-screen bg-gray-50 font-body">
      <Hero />
      {/* <SearchBar /> */}
      <WhyChooseUs />
      <FeaturedPackages packages={packages} loading={loading} />
      <Testimonials />
    </main>
  );
};

export default HomePage;

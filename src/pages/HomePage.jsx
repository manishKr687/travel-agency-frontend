import React from "react";
import { usePackages } from "../context/PackagesContext";
import FeaturedPackages from "../components/home/FeaturedPackages";
import Hero from "../components/home/Hero";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs";

const HomePage = () => {
  const { packages, loading } = usePackages();   // INSTANT access

  return (
    <main className="min-h-screen bg-gray-50 font-body">
      <Hero />
      <WhyChooseUs />
      <FeaturedPackages packages={packages} loading={loading} />
      <Testimonials />
    </main>
  );
};

export default HomePage;

"use client";

import clsx from "clsx";
import ProductCarousel from "./ProductCarousel";

export default function ProductShowcase() {
  return (
    <section id="products" className="relative py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 animate-gradient-x" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Product Lineup
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            High-quality automotive components engineered for performance,
            reliability, and precision manufacturing.
          </p>
        </div>

        {/* Carousel */}
        <ProductCarousel className="mt-8" />
      </div>
    </section>
  );
}

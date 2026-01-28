import React, { useRef } from "react";
import Navbar from "./commons/Navbar";
import { categories } from "../category";
import CategoryCard from "./user-components/CategoryCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function UserDashboard() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-3 sm:px-6 py-6 text-white">

        {/* Header */}
        <div className="max-w-7xl mx-auto mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Explore Categories
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Choose what you’re craving today
            </p>
          </div>

          {/* Desktop arrows */}
          <div className="hidden lg:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Category Slider */}
        <div className="max-w-7xl mx-auto">
          <div
            ref={scrollRef}
            className="
              flex gap-3 sm:gap-4 md:gap-5
              overflow-x-auto
              scrollbar-hide
              py-2
              snap-x snap-mandatory
            "
          >
            {categories.map((cat, index) => (
              <div key={index} className="snap-start">
                <CategoryCard data={cat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;

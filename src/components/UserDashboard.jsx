import React, { useRef } from "react";
import Navbar from "./commons/Navbar";
import { categories } from "../category";
import CategoryCard from "./user-components/CategoryCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import FoodCard from "./user-components/FoodCard";

function UserDashboard() {
  const { city, shopInMyCity, itemsInMyCity } = useSelector(
    (state) => state.user,
  );
  const shops = shopInMyCity?.data?.shops || [];
  const items = itemsInMyCity?.data?.items || [];

  const categoryRef = useRef(null);
  const shopRef = useRef(null);

  const scroll = (ref, direction) => {
    ref.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-6 text-white">
        {/* ================= CATEGORY SECTION ================= */}
        <section className="max-w-7xl mx-auto mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Explore Categories
              </h1>
              <p className="text-sm text-gray-300">
                What are you craving today?
              </p>
            </div>

            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => scroll(categoryRef, "left")}
                className="slider-btn"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => scroll(categoryRef, "right")}
                className="slider-btn"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div
            ref={categoryRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          >
            {categories.map((cat, index) => (
              <div key={index} className="snap-start">
                <CategoryCard name={cat.category} image={cat.image} />
              </div>
            ))}
          </div>
        </section>

        {/* ================= SHOP SECTION ================= */}
        <section className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Best Shops in {city}
              </h1>
              <p className="text-sm text-gray-300">
                Top rated restaurants near you
              </p>
            </div>

            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => scroll(shopRef, "left")}
                className="slider-btn"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => scroll(shopRef, "right")}
                className="slider-btn"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {shops.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-300">
              No shops available in your city yet
            </div>
          ) : (
            <div
              ref={shopRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
            >
              {shops.map((shop, index) => (
                <div key={index} className="snap-start">
                  <CategoryCard name={shop.name} image={shop.image} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= PRODUCT SECTION ================= */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="mb-5">
            <h1 className="text-2xl md:text-3xl font-bold">
              Popular Items Near You
            </h1>
            <p className="text-sm text-gray-300">
              Handpicked dishes from top shops
            </p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-300">
              No food items available 🍽️
            </div>
          ) : (
            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
            "
            >
              {items.map((item, index) => (
                <FoodCard key={index} data={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default UserDashboard;

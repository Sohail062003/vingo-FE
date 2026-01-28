import React from "react";

function CategoryCard({ data }) {
  return (
    <div
      className="
        flex-shrink-0
        w-[130px]
        xs:w-[140px]
        sm:w-[160px]
        md:w-[180px]
        lg:w-[190px]
        bg-white/10
        backdrop-blur-xl
        rounded-2xl
        border border-white/20
        p-3 sm:p-4
        cursor-pointer
        hover:scale-105
        hover:bg-white/20
        transition
        shadow-lg
      "
    >
      {/* Image */}
      <div className="w-full h-[90px] sm:h-[110px] md:h-[120px] rounded-xl overflow-hidden mb-3">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-center font-medium text-white text-xs sm:text-sm md:text-base truncate">
        {data.category}
      </h3>
    </div>
  );
}

export default CategoryCard;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaStore, FaMapMarkerAlt, FaImage } from "react-icons/fa";

function CreateEditShop() {
  const { myShopData } = useSelector((state) => state.owner);

  const [formData, setFormData] = useState({
    name: myShopData?.data?.shop?.name || "",
    city: myShopData?.data?.shop?.city || "",
    state: myShopData?.data?.shop?.state || "",
    address: myShopData?.data?.shop?.address || "",
    image: null,
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    setFormData({ ...formData, image: file });
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Glass Card */}
      <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl -z-10"></div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white">
            <FaStore size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {myShopData ? "Edit Shop Details" : "Create Your Shop"}
            </h2>
            <p className="text-sm text-gray-300">
              {myShopData
                ? "Update your shop information"
                : "Fill details to start receiving orders"}
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Shop Name */}
          
          <div>
            <label className="text-sm text-gray-300">Shop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Eg. Food House"
              className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <FaImage /> Shop Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 p-2 text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg
              file:border-0
              file:text-sm file:font-semibold
              file:bg-gradient-to-r file:from-orange-500 file:to-pink-500
              file:text-white
              hover:file:opacity-90"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Pune"
                className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Maharashtra"
                className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <FaMapMarkerAlt /> Address
            </label>
            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full shop address"
              className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={undefined}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.02] transition"
          >
            {myShopData ? "Update Shop" : "Create Shop"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;

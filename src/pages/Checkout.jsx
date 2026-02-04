import React from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaSearch,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";

function Checkout() {
  const navigate = useNavigate();
  const { location } = useSelector((state) => state.map);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <FaArrowLeft className="text-orange-400" size={22} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* DELIVERY LOCATION */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <FaMapMarkerAlt className="text-orange-400" size={20} />
                <h2 className="text-lg sm:text-xl font-semibold">
                  Delivery Location
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search your delivery location"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-300"
                />

                <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold hover:opacity-90 transition">
                  <FaSearch />
                  Search
                </button>

                <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition">
                  <MdMyLocation size={20} />
                  Current Location
                </button>
              </div>

              {/* MAP PLACEHOLDER */}
              <div className="mt-5 h-56 sm:h-64 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-gray-300">
                <MapContainer
                  zoom={213}
                  className={"w-full h-full"}
                  center={[location?.lat, location?.lon]}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[location?.lat, location?.lon]}></Marker>
                </MapContainer>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <FaMoneyBillWave className="text-green-400" size={20} />
                <h2 className="text-lg sm:text-xl font-semibold">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer">
                  <p className="font-semibold">Cash on Delivery</p>
                  <p className="text-sm text-gray-300">Pay when food arrives</p>
                </div>

                <div className="p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer">
                  <p className="font-semibold">Online Payment</p>
                  <p className="text-sm text-gray-300">UPI, Card, NetBanking</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl h-fit">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹XXXX</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹XX</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹XX</span>
              </div>
              <hr className="border-white/20" />
              <div className="flex justify-between text-base font-semibold text-green-400">
                <span>Total Payable</span>
                <span>₹XXXX</span>
              </div>
            </div>

            <button className="mt-6 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold hover:opacity-90 transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

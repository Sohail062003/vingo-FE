import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaSearch,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdDeliveryDining, MdMyLocation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import apiInterceptor from "../api/apiInterceptor";


function RecenterMap({ location }) {
  const map = useMap(); // ✅ always called

  useEffect(() => {
    if (location?.lat && location?.lon) {
      map.setView([location.lat, location.lon], 16, {
        animate: true,
      });
    }
  }, [location, map]);

  return null;
}


function Checkout() {
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const diliveryfee = totalAmount > 500 ? 0 : 40;
  const AmountWithDeliveryFee = totalAmount + diliveryfee;

  const onDragnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat: lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }));
      getAddressByLatLng(latitude, longitude);
    });
  };

  const getAddressByLatLng = async (latitude, longitude) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`,
      );
      dispatch(setAddress(result?.data?.results[0]?.address_line2));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`,
      );
      console.log(result.data.features[0].properties.lat);
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
    } catch (error) {
      console.error("Error fetching lat/lng:", error);
    }
  };

  // order api 
  const handlePlaceOrder = async () => {
    try {
      const result = await apiInterceptor.post("/order/place-order",{
        paymentMethod,
        deliveryAddress: {
          text: addressInput,
          latitude: location?.lat,
          longitude: location?.lon,
        },
        totalAmount,
        cartItems

      }, {withCredentials: true});
      console.log(result);
      navigate("/order-placed");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

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
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Search your delivery location"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-300"
                />

                <button
                  onClick={getLatLngByAddress}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold hover:opacity-90 transition"
                >
                  <FaSearch />
                  Search
                </button>

                <button
                  onClick={getCurrentLocation}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
                >
                  <MdMyLocation size={20} />
                  Current Location
                </button>
              </div>

              {/* MAP PLACEHOLDER */}
              <div className="mt-5 h-56 sm:h-64 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-gray-300">
                <MapContainer
                  zoom={16}
                  className={"w-full h-full"}
                  center={[location?.lat, location?.lon]}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <RecenterMap location={location} />
                  <Marker
                    position={[location?.lat, location?.lon]}
                    draggable
                    eventHandlers={{ dragend: onDragnd }}
                  />
                </MapContainer>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <FaMoneyBillWave className="text-green-400" size={20} />
                <h2 className="text-lg sm:text-xl font-semibold">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CASH ON DELIVERY */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`
                    relative p-5 rounded-xl border cursor-pointer transition-all duration-300
                    ${
                      paymentMethod === "cod"
                        ? "border-green-400 bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.35)] scale-[1.02]"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/20">
                        <MdDeliveryDining className="text-green-400 text-2xl" />
                      </div>

                      <div>
                        <p className="font-semibold">Cash on Delivery</p>
                        <p className="text-sm text-gray-300">
                          Pay when food arrives
                        </p>
                      </div>
                    </div>

                    {paymentMethod === "cod" && (
                      <BsCheckCircleFill className="text-green-400 text-xl" />
                    )}
                  </div>
                </div>

                {/* ONLINE PAYMENT */}
                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`
        relative p-5 rounded-xl border cursor-pointer transition-all duration-300
        ${
          paymentMethod === "online"
            ? "border-blue-400 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.35)] scale-[1.02]"
            : "border-white/20 bg-white/5 hover:bg-white/10"
        }
      `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <FaCreditCard className="text-blue-400 text-xl" />
                      </div>

                      <div>
                        <p className="font-semibold">Online Payment</p>
                        <p className="text-sm text-gray-300">
                          UPI, Card, NetBanking
                        </p>
                      </div>
                    </div>

                    {paymentMethod === "online" && (
                      <BsCheckCircleFill className="text-blue-400 text-xl" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
         
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl h-fit">
            <h2 className="text-lg sm:text-xl font-semibold mb-5">
              Order Summary
            </h2>

            {/* ITEMS LIST */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start text-sm"
                >
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-gray-400 text-xs">
                      Qty × {item.quantity}
                    </p>
                  </div>

                  <p className="text-gray-300 font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-5 border-t border-white/20" />

            {/* BILL DETAILS */}
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery charge</span>
                <span>₹{diliveryfee}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes & Charges</span>
                <span>₹XX</span>
              </div>

              <div className="flex justify-between text-base font-semibold text-green-400 pt-2">
                <span>Total Payable</span>
                <span>₹{AmountWithDeliveryFee}</span>
              </div>
            </div>

            {/* CTA BUTTON */}
            <button
            onClick={handlePlaceOrder}
            className={`${paymentMethod === "cod" ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-[0_0_20px_rgba(34,197,94,0.35)] scale-[1.02]" : 
              "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_20px_rgba(59,130,246,0.35)] scale-[1.02]"} 
              mt-6 w-full px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition`}>
              {paymentMethod === "cod" ? "Place Cash on Delivery Order" : "Place Online Payment Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

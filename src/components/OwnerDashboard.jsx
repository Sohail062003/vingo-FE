import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./commons/Navbar";
import { FaStoreAlt, FaPlusCircle } from "react-icons/fa";
import apiInterceptor from "../api/apiInterceptor";
import { setMyShopData } from "../redux/ownerSlice";
import { useState } from "react";

function OwnerDashboard() {
  const { myShopData, loading } = useSelector((state) => state.owner);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [deleteItemId, setDeleteItemId] = useState(null);

  const items = myShopData?.data?.shop?.items || [];

  const handelDeleteItem = async (itemId) => {
    try {
      const result = await apiInterceptor.get(`/item/delete-item/${itemId}`, {
        withCredentials: true,
      });
      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.error("error", error);
    }
  };

  if (loading) { 
    return <div> loading </div>
  }

  return (
    <>
      <Navbar />

      {(!myShopData || !myShopData?.data?.shop) && (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
          {/* Glass Card */}
          <div className="relative w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl -z-10"></div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg">
                <FaStoreAlt size={28} />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-white mb-2">
              No Shop Registered Yet
            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 text-sm mb-6">
              You haven’t created your shop yet. Register your shop to start
              receiving orders and manage your business.
            </p>

            {/* Action Button */}
            <Link
              to="/owner/create-shop"
              className="
                inline-flex items-center gap-2
                px-6 py-3
                rounded-lg
                bg-gradient-to-r from-orange-500 to-pink-500
                text-white font-semibold
                shadow-lg
                hover:scale-[1.03]
                transition
              "
            >
              <FaPlusCircle size={18} />
              Create Your Shop
            </Link>

            {/* Hint */}
            <p className="text-xs text-gray-400 mt-4">
              It only takes a minute to get started 🚀
            </p>
          </div>
        </div>
      )}

      {/* When shop exists */}
      {myShopData?.data?.shop && (
        <>
          <div className="w-full max-w-6xl mx-auto px-4 py-6 text-white">
            {/* Store Header */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              {/* Store Image */}
              <img
                src={myShopData.data.shop.image}
                alt={myShopData.data.shop.name}
                className="w-full h-64 md:h-80 object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Store Info */}
              <div className="absolute bottom-4 left-4 md:left-6">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {myShopData.data.shop.name}
                </h1>
                <p className="text-sm text-gray-300">
                  {myShopData.data.shop.city}, {myShopData.data.shop.state}
                </p>
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Store Details Card */}
              <div className="md:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Store Details</h2>

                <div className="space-y-3 text-sm text-gray-200">
                  <p>
                    <span className="font-medium text-white">Address:</span>{" "}
                    {myShopData.data.shop.address}
                  </p>

                  <p>
                    <span className="font-medium text-white">City:</span>{" "}
                    {myShopData.data.shop.city}
                  </p>

                  <p>
                    <span className="font-medium text-white">State:</span>{" "}
                    {myShopData.data.shop.state}
                  </p>

                  <p>
                    <span className="font-medium text-white">Created On:</span>{" "}
                    {new Date(
                      myShopData.data.shop.createdAt,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Manage Store</h2>
                  <p className="text-sm text-gray-300">
                    Update your store details or manage items
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/owner/create-shop")}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 font-semibold hover:opacity-90 transition"
                  >
                    Edit Store
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="mt-12 w-full max-w-6xl mx-auto px-4 py-6">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Menu Items</h2>

              <button
                onClick={() => navigate("/owner/add-food")}
                className="mt-3 sm:mt-0 px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition text-sm font-medium text-white"
              >
                + Add New Item
              </button>
            </div>

            {/* Empty State */}
            {items.length === 0 && (
              <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                <p className="text-gray-300 text-sm">No menu items added yet</p>
              </div>
            )}

            {/* Menu Cards */}
            {items.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:shadow-2xl transition"
                  >
                    {/* Image */}
                    <div className="relative h-48">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Food Type */}
                      <span
                        className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full text-white
                        ${item.foodType === "veg" ? "bg-green-600" : "bg-red-600"}`}
                      >
                        {item?.foodType === "veg" ? "Veg" : "Non Veg"}
                      </span>

                      {/* Category */}
                      <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-black/60 text-white">
                        {item.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">
                          {item.name}
                        </h3>

                        <p className="text-lg font-bold text-orange-400">
                          ₹{item.price}
                        </p>
                      </div>

                      <p className="mt-2 text-sm text-gray-400">
                        Freshly prepared with quality ingredients
                      </p>

                      {/* Actions */}
                      <div className="mt-5 flex gap-3">
                        <button
                          onClick={() =>
                            navigate(`/owner/edit-item/${item._id}`)
                          }
                          className="flex-1 py-2 rounded-lg border border-white/20 text-sm text-white hover:bg-white/10 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setDeleteItemId(item._id)}
                          className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-sm text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {deleteItemId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1f1f2e] rounded-2xl p-6 w-[90%] max-w-md border border-white/10 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-2">
              Delete Item
            </h3>

            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to delete this item?
              <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteItemId(null)}
                className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handelDeleteItem(deleteItemId);
                  setDeleteItemId(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OwnerDashboard;

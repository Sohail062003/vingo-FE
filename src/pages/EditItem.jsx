import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaImage, FaUtensils, FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import apiInterceptor from "../api/apiInterceptor";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

function EditItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState(null)

  

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    foodType: "veg",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGetItemById = async() => {
        try {
            const result = await apiInterceptor.get(`/item/get-by-id/${itemId}`,
                { withCredentials: true }
            );
            setCurrentItem(result.data);
            
        } catch (error) {
            console.error("error", error);
        }
    }
    handleGetItemById();
  }, [itemId])

  // 🔹 Prefill form
  useEffect(() => {
    if (currentItem) {
      setFormData({
        name: currentItem.data.item.name || "",
        category: currentItem.data.item.category || "",
        price: currentItem.data.item.price || "",
        foodType: currentItem.data.item.foodType || "veg",
        image: null,
      });
      setPreview(currentItem.data.item.image); // existing image
    }
  }, [currentItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
    //   form.append("itemId", item._id);
      form.append("name", formData.name);
      form.append("category", formData.category);
      form.append("price", formData.price);
      form.append("foodType", formData.foodType);

      // send image only if changed
      if (formData.image instanceof File) {
        form.append("image", formData.image);
      }

      const result = await apiInterceptor.post(
        `/item/edit-item/${itemId}`,
        form,
        { withCredentials: true }
      );

      dispatch(setMyShopData(result.data));
      
      navigate(-1);
    } catch (err) {
      console.error("Edit Item Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <ClipLoader size={45} color="#f97316" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="relative w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-300 hover:text-white text-sm"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Header */}
        <div className="flex mt-2 items-center gap-4 mb-8">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white">
            <FaUtensils size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Menu Item</h2>
            <p className="text-sm text-gray-300">
              Update item details
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Item Name */}
          <div>
            <label className="text-sm text-gray-300">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20"
            >
              <option value="">Select Category</option>
              <option>Burgers</option>
              <option>Pizza</option>
              <option>Snacks</option>
              <option>Main Course</option>
              <option>Desserts</option>
              <option>Chinese</option>
              <option>Fast Food</option>
              <option>Others</option>
            </select>
          </div>

          {/* Price & Food Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 flex items-center gap-1">
                <FaRupeeSign /> Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
                className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Food Type</label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-black/30 text-white border border-white/20"
              >
                <option value="veg">Veg</option>
                <option value="non veg">Non Veg</option>
              </select>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <FaImage /> Item Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-gradient-to-r file:from-orange-500 file:to-pink-500
              file:text-white"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg border border-white/20"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:scale-[1.02] transition"
          >
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditItem;

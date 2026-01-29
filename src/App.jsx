import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemByCity from "./hooks/useGetItemByCity";

function App() {
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemByCity();
  return (
    <RouterProvider router={router} />
  )
}

export default App

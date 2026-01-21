import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";

function App() {
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  return (
    <RouterProvider router={router} />
  )
}

export default App

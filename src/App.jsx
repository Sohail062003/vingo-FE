import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetCity from "./hooks/useGetCity";

function App() {
  useGetCurrentUser();
  useGetCity();
  return (
    <RouterProvider router={router} />
  )
}

export default App

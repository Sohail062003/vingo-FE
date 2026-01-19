import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import useGetCurrentUser from "./hooks/useGetCurrentUser";

function App() {
  useGetCurrentUser();
  return (
    <RouterProvider router={router} />
  )
}

export default App

import { createBrowserRouter } from "react-router-dom";
import OpenLayout from "../layouts/OpenLayout";
import OpenRoutes from "./OpenRoutes";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <OpenLayout />,
        children: OpenRoutes
    }
])
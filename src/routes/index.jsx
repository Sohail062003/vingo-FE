import { createBrowserRouter } from "react-router-dom";
import OpenLayout from "../layouts/OpenLayout";
import AuthLayout from "../layouts/AuthLayout";
import OpenRoutes from "./OpenRoutes";
import AuthRoutes from "./AuthRoutes";




export const router = createBrowserRouter([
    {
        element: <OpenLayout />,
        children: OpenRoutes
    },
    {
        element: <AuthLayout />,
        children: AuthRoutes 
    }
])
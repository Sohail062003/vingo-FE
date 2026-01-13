import { lazy } from 'react';
import Loadable from '../utils/Loadable';


const SignIn = Loadable( lazy (() => import('../pages/SignIn')));
const SignUp = Loadable( lazy (() => import('../pages/SignUp')));
const ForgotPassword = Loadable( lazy (() => import('../pages/ForgotPassword')));

const OpenRoutes = [
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    }
]

export default OpenRoutes;
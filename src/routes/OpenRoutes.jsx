import { lazy } from 'react';
import Loadable from '../utils/Loadable';


const SignIn = Loadable( lazy (() => import('../pages/SignIn')));
const SignUp = Loadable( lazy (() => import('../pages/SignUp')));

const OpenRoutes = [
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
]

export default OpenRoutes;
import { lazy } from 'react';
import Loadable from '../utils/Loadable';


const Home = Loadable( lazy (() => import('../pages/Home')));


const AuthRoutes = [
    {
        index: true,
        element: <Home />
    },
    
]

export default AuthRoutes;

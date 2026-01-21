import { lazy } from 'react';
import Loadable from '../utils/Loadable';


const Home = Loadable( lazy (() => import('../pages/Home')));
const About = Loadable( lazy (() => import('../pages/About')));
const CreateEditShop = Loadable( lazy (() => import('../pages/CreateEditShop')));

const AuthRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/owner/create-shop',
        element: <CreateEditShop />
    }
    
]

export default AuthRoutes;

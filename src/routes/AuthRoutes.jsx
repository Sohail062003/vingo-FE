import { lazy } from 'react';
import Loadable from '../utils/Loadable';


const Home = Loadable( lazy (() => import('../pages/Home')));
const About = Loadable( lazy (() => import('../pages/About')));
const CreateEditShop = Loadable( lazy (() => import('../pages/CreateEditShop')));
const AddItem = Loadable( lazy (() => import('../pages/AddItem')));
const EditItem = Loadable( lazy (() => import('../pages/EditItem')));
const CartPage = Loadable( lazy (() => import('../pages/CartPage')));

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
    },
    {
        path: '/owner/add-food',
        element: <AddItem />
    },
    {
        path: '/owner/edit-item/:itemId',
        element: <EditItem />
    },
    {
        path: '/cart',
        element: <CartPage />
    }

    
]

export default AuthRoutes;

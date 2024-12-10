import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

import App from './App.jsx'
import {ErrorPage} from './components/ErrorPage.jsx'
import { ProductList } from './components/ProductList.jsx';
import { ProductDetail } from './components/ProductDetail.jsx';
import {Cart_Display} from './components/Cart_Display.jsx'
import { PlacedOrder } from './components/PlacedOrder.jsx';
import { AccessDenied } from './components/AccessDenied.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { SignUpPage } from './components/SignupPage.jsx';


const router = createBrowserRouter([
    {
      path:'/',
      element: <App />,
      errorElement: <ErrorPage />,
      children:[
        {
          path:'/',
          element: <ProductList/>
        },
        {
          path:'/product/:id',
          element: < ProductDetail/>
        },
        {
          path:'/cart',
          element: <Cart_Display />
        },
        {
          path:'/Final',
          element: <PlacedOrder/>
        },
        {
          path: '/AccessDenied',
          element: <AccessDenied />
        },
        {
          path:'/UserLogin',
          element: <LoginPage/>
        },
        {
          path:'/UserSignUp',
          element: <SignUpPage/>
        }
      ]
    },
    
  
  ])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
  
)

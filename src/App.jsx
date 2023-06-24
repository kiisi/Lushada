import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'
import Home from './pages/Home';
import Cart from './pages/Cart';
import axios from 'axios'
import Auth from './components/Auth'


axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth><Home /></Auth>
  },
  {
    path: "/cart",
    element: <Auth><Cart /></Auth>
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Finca from "./pages/finca/Finca";
import Cosecha from "./pages/cosecha/Cosecha";
import Lotes from "./pages/lote/Lotes";

import Th from  "./pages/TH/Th"; //pagina para temperatura-humedad
import Pr  from "./pages/PrR/Pr"; //pagina para PRECIPITACION
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar/>
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer/>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/finca",
          element: <Finca />,
        },
        {
          path: "/lotes",
          element: <Lotes />,
        },
        {
          path: "/cosecha",
          element: <Cosecha/>,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/Th",
          element: <Th />,
        },
        {
          path: "/Pr",
          element: <Pr />,
        },

      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

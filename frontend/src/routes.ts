import StartPage from "./pages/StartPage.tsx"
import HomePage from "./pages/HomePage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx";

import {
    createBrowserRouter,
  } from "react-router";

const router = createBrowserRouter([
    {
      path: "/",
      Component: StartPage,
    },  
    {
      path: "/home",
      Component: HomePage,
    },
    {
      path: "/login",
      Component: LoginPage,
    },
    {
      path: "/register",
      Component: RegisterPage,
    },
  ]);
  export default router
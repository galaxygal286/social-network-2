import {
  RouterProvider,createBrowserRouter
} from "react-router";

import Loading from './components/Loading.tsx';
import StartPage from "./pages/StartPage.tsx"
import HomePage from "./pages/HomePage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx";
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AuthRedirect from './components/AuthRedirect.tsx';
import ProfilePage from './pages/ProfilePage.tsx';


const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthRedirect>
          <StartPage/> 
      </AuthRedirect>  
    },  
    {
      path: "/login",
      element: <AuthRedirect>
          <LoginPage/> 
      </AuthRedirect> 
    },
    {
      path: "/register",
      element: <AuthRedirect>
          <RegisterPage/> 
      </AuthRedirect> 
    },
    {
      path: "/home",
      element:<ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    },
    {
      path: "/profile",
      element:<ProtectedRoute>
        <ProfilePage/>
      </ProtectedRoute>
    },
  ]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <Loading/>
    </>
  )
}

export default App

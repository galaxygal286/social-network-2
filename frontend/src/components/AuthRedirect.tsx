import { Navigate } from "react-router";
import useAuthStore from "../store/authStore";

const AuthRedirect:React.FC<{children:React.ReactNode}> = ({children}) => {
    const { authenticated } = useAuthStore();
    
    if (!authenticated) {
      return <>{children}</>;
    }
    
    return <Navigate to="/home" />;
  };

  export default AuthRedirect
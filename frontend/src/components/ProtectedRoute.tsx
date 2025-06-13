import { Navigate } from "react-router";
import useAuthStore from "../store/authStore";

const ProtectedRoute:React.FC<{children:React.ReactNode}> = ({children}) => {
    const { authenticated } = useAuthStore();
    
    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    
    return <>{children}</>;
  };

  export default ProtectedRoute
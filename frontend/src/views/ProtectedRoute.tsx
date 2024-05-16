import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { RootState } from '../store';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn);
    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
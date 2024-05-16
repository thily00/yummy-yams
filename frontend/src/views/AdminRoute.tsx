import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { RootState } from '../store';

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const isAdmin = useSelector((state:RootState) => state.auth.isAdmin);

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
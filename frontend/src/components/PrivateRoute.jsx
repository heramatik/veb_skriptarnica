import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    // Ako je korisnik ulogovan, pusti ga (Outlet), ako nije, šalji ga na login
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    // Ako je ulogovan i usput je ADMIN, pusti ga, ako nije, šalji ga na login
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
};
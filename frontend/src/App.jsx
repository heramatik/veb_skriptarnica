import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AdminNavbar from './components/AdminNavbar';
import AdminLayout from './components/AdminLayout';
import { Routes, Route } from 'react-router-dom';
import EditProfileScreen from './screens/EditProfileScreen';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import VertigoHomeScreen from './screens/VertigoHomeScreen';
import MenuScreen from './screens/MenuScreen';
import CedjenoScreen from './screens/CedjenoScreen';
import WineScreen from './screens/WineScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import OrderScreen from './screens/OrderScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddCardScreen from './screens/AddCardScreen';
// UVOZIMO ZAŠTITU RUTA
import { PrivateRoute, AdminRoute } from './components/PrivateRoute';
// admin ekrani
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import AdminProductsScreen from './screens/AdminProductsScreen';
import AdminOrdersScreen from './screens/AdminOrdersScreen';
import AdminUsersScreen from './screens/AdminUsersScreen';

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      
      {userInfo?.isAdmin && <AdminNavbar />}

      <main className='py-3'>
        <Container>
          <Routes>
            {/* JAVNE RUTE - Svako može da vidi */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/vertigo" element={<VertigoHomeScreen />} />
            <Route path="/vertigo/menu" element={<MenuScreen />} />
            <Route path="/vertigo/cedjeno" element={<CedjenoScreen />} />
            <Route path="/vertigo/vina" element={<WineScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path="/edit-profile" element={<EditProfileScreen />} />

            {/* ZAŠTIĆENE RUTE ZA KORISNIKE - Mora biti ulogovan bilo koji status */}
            <Route path='' element={<PrivateRoute />}>
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/order' element={<OrderScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/cards' element={<AddCardScreen />} />
            </Route>
            {/* ADMIN RUTE */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboardScreen />} />
                <Route path="/admin/products" element={<AdminProductsScreen />} />
                <Route path="/admin/orders" element={<AdminOrdersScreen />} />
                <Route path="/admin/users" element={<AdminUsersScreen />} />
              </Route>
            </Route>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
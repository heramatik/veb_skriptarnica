import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

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

// OVDE ĆEŠ KASNIJE KREIRATI I UVESTI ADMIN EKRANE
// import AdminUsersScreen from './screens/AdminUsersScreen';
// import AdminControlScreen from './screens/AdminControlScreen';

function App() {
  return (
    <>
      <Header />

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

            {/* ZAŠTIĆENE RUTE ZA KORISNIKE - Mora biti ulogovan bilo koji status */}
            <Route path='' element={<PrivateRoute />}>
              <Route path='' element={<PrivateRoute />}>
                <Route path='/shipping' element={<ShippingScreen />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/order' element={<OrderScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/cards' element={<AddCardScreen />} />
              </Route>
            </Route>

            {/* SPECIJALNE ADMIN RUTE - Samo ti (isAdmin: true) možeš da otvoriš */}
            <Route path='' element={<AdminRoute />}>
              { }
            </Route>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
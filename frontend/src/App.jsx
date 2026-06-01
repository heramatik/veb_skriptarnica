import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import VertigoHomeScreen from './screens/VertigoHomeScreen';
import MenuScreen from './screens/MenuScreen';
import CedjenoScreen from './screens/CedjenoScreen';
import WineScreen from './screens/WineScreen';

function App() {
  return (
    <>
      <Header />

      <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />

            <Route path="/vertigo" element={<VertigoHomeScreen />} />
            <Route path="/vertigo/menu" element={<MenuScreen />} />
            <Route path="/vertigo/cedjeno" element={<CedjenoScreen />} />
            <Route path="/vertigo/vina" element={<WineScreen />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
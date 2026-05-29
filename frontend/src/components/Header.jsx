import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from 'react-bootstrap';

import {
  FaShoppingCart,
  FaUser,
  FaWineGlass,
  FaGlassWhiskey,
  FaHome,
} from 'react-icons/fa';

import logo from '../assets/logo.png';

import { LinkContainer } from 'react-router-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { useLogoutMutation } from '../slices/usersApiSlice';

import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();

      dispatch(logout());

      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar expand="lg"
        style={{
            backgroundColor: '#f8d7da',
            padding: '15px 0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
     }} >
        <Container>

          {/* LOGO */}

          <LinkContainer to='/'>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img src={logo} alt="Heramatik" style={{ 
            width: '45px',
            height: '45px',
            borderRadius: '12px',
        }}/>

        <span style={{
            fontWeight: 'bold',
            fontSize: '1.4rem',
            color: '#4b2e2e',
        }}> Heramatik </span> </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>

            {/* LEVA STRANA */}

            <Nav className='me-auto'>

              <LinkContainer to='/'>
                <Nav.Link>
                  <FaHome /> Početna
                </Nav.Link>
              </LinkContainer>
            </Nav>

            {/* DESNA STRANA */}

            <Nav>

              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Korpa

                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg='danger'
                      style={{ marginLeft: '5px' }}
                    >
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Moj nalog
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Odjava
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaUser /> Prijava
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/register'>
                    <Nav.Link>
                      Registracija
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
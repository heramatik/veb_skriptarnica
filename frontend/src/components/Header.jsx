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
    FaHome,
    FaCrown,    // Ikona za admina
    FaSlidersH, // Ikona za podešavanja lokala
} from 'react-icons/fa';

import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
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
        } catch (err) {
            console.error(err);
        }
        dispatch(logout());   // uvek očisti sesiju, bez obzira na server
        navigate('/login');
    };

    // Pomoćna funkcija koja dodaje vizuelni bedž ili tekst pored imena u zavisnosti od uloge
    const renderRoleBadge = (role) => {
        switch (role) {
            case 'admin': return ' 👑 (Admin)';
            case 'menadzer': return ' 👔 (Menadžer)';
            case 'konobar': return ' ☕ (Osoblje)';
            case 'stalan_gost': return ' ⭐ (VIP)';
            default: return '';
        }
    };

    return (
        <header>
            <Navbar expand="lg"
                style={{
                    backgroundColor: '#958b90',
                    padding: '15px 0',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }} >
                <Container>

                    {/* LOGO */}
                    <LinkContainer to='/'>
                        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
                            <img src={logo} alt="Heramatik" style={{
                                width: '65px',
                                height: '45px',
                            }} />
                            <span
                                style={{
                                    fontWeight: '800',
                                    fontSize: '1.5rem',
                                    color: '#4b2e2e',
                                    letterSpacing: '1px',
                                }}
                            >
                                HERAMATIK
                            </span>
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />

                    <Navbar.Collapse id='basic-navbar-nav'>

                        {/* LEVA STRANA */}
                        <Nav className='me-auto'>
                            <LinkContainer to='/'>
                                <Nav.Link
                                    style={{
                                        fontWeight: '600',
                                        color: '#4b2e2e',
                                    }} >
                                    <FaHome style={{ marginBottom: '3px' }} /> Početna
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

                            {/* KORISNIČKI MENI */}
                            {userInfo ? (
                                <NavDropdown
                                    title={`${userInfo.name}${renderRoleBadge(userInfo.role)}`}
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

                            {/* SPECIJALNI ULZ ZA TEBE (ADMIN PANEL) */}
                            {userInfo && userInfo.role === 'admin' && (
                                <NavDropdown
                                    title={<span><FaCrown style={{ color: '#ffc107', marginRight: '5px' }} /> Admin Panel</span>}
                                    id='adminmenu'
                                    className='ms-lg-2'
                                >
                                    <LinkContainer to='/admin/skriptarnica-kontrola'>
                                        <NavDropdown.Item>
                                            <FaSlidersH className='me-2' /> Globalna kontrola lokala
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/korisnici'>
                                        <NavDropdown.Item>
                                            👥 Upravljanje ulogama
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
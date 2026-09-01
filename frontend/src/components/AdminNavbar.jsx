import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const navItems = [
        {
            name: '🏠 Dashboard',
            path: '/admin',
        },
        {
            name: '📦 Porudžbine',
            path: '/admin/orders',
        },
        {
            name: '🛍️ Proizvodi',
            path: '/admin/products',
        },
        {
            name: '👥 Korisnici',
            path: '/admin/users',
        },
    ];

    return (
        <div
            style={{
                padding: '15px 20px',
                background:
                    'linear-gradient(135deg, #958b90 0%, #d5c2bc 100%)',
            }}
        >
            <Navbar
                expand="lg"
                style={{
                    backgroundColor: '#4b2e2e',
                    borderRadius: '25px',
                    padding: '12px 20px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                }}
            >
                <Container fluid>
                    <Navbar.Toggle
                        aria-controls="admin-navbar"
                        style={{
                            backgroundColor: '#d5c2bc',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    />

                    <Navbar.Collapse id="admin-navbar">

                        {/* NAVIGACIJA */}
                        <Nav className="mx-auto gap-2">

                            {navItems.map((item) => {
                                const isActive =
                                    location.pathname === item.path;

                                return (
                                    <Nav.Link
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        style={{
                                            color: isActive
                                                ? '#4b2e2e'
                                                : '#fff7fb',
                                            backgroundColor: isActive
                                                ? '#d5c2bc'
                                                : 'transparent',
                                            borderRadius: '15px',
                                            padding: '9px 15px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: '0.2s',
                                        }}
                                    >
                                        {item.name}
                                    </Nav.Link>
                                );
                            })}

                        </Nav>

                        {/* ODJAVA */}
                        <Button
                            onClick={logoutHandler}
                            style={{
                                backgroundColor: '#d5c2bc',
                                color: '#4b2e2e',
                                border: 'none',
                                borderRadius: '15px',
                                padding: '9px 18px',
                                fontWeight: '600',
                            }}
                        >
                            🚪 Odjava
                        </Button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default AdminNavbar;
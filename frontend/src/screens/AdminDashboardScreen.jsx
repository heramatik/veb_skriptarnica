import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
    FaUsers,
    FaCoffee,
    FaClipboardList,
} from 'react-icons/fa';

import { useGetUsersQuery } from '../slices/userApiSlice';
import { useGetAllOrdersQuery } from '../slices/orderApiSlice';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const AdminDashboardScreen = () => {

    const { data: users = [] } = useGetUsersQuery();
    const { data: orders = [] } = useGetAllOrdersQuery();
    const { data: products = [] } = useGetProductsQuery();

    return (
        <div
            style={{
                minHeight: '100vh',
                borderRadius: '40px',
                background:
                    'linear-gradient(135deg, #958b90 0%, #d5c2bc 100%)',
                padding: '40px 20px 80px',
            }}
        >
            <Container>

                {/* NASLOV */}
                <div className="text-center mb-5">
                    <h1
                        style={{
                            color: '#4b2e2e',
                            fontWeight: 'bold',
                            fontFamily: 'initial',
                        }}
                    >
                        👑 ADMIN DASHBOARD
                    </h1>

                    <p
                        style={{
                            color: '#2b2525',
                            fontSize: '1.1rem',
                        }}
                    >
                        Dobrodošao u administratorski panel Heramatik aplikacije.
                    </p>
                </div>

                {/* STATISTIKA */}
                <Row className="g-4 mb-5">

                    {/* KORISNICI */}
                    <Col md={4}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                background: '#fff7fb',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Body className="text-center p-4">

                                <FaUsers
                                    size={50}
                                    color="#4b2e2e"
                                />

                                <h5
                                    className="mt-3"
                                    style={{
                                        color: '#4b2e2e',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    KORISNICI
                                </h5>

                                <h2
                                    style={{
                                        color: '#441212',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {users.length}
                                </h2>

                                <p className="mb-0">
                                    Registrovanih korisnika
                                </p>

                            </Card.Body>
                        </Card>
                    </Col>

                    {/* PORUDŽBINE */}
                    <Col md={4}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                background: '#fff7fb',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Body className="text-center p-4">

                                <FaClipboardList
                                    size={50}
                                    color="#4b2e2e"
                                />

                                <h5
                                    className="mt-3"
                                    style={{
                                        color: '#4b2e2e',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    PORUDŽBINE
                                </h5>

                                <h2
                                    style={{
                                        color: '#441212',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {orders.length}
                                </h2>

                                <p className="mb-0">
                                    Ukupno porudžbina
                                </p>

                            </Card.Body>
                        </Card>
                    </Col>

                    {/* PROIZVODI */}
                    <Col md={4}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                background: '#fff7fb',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Body className="text-center p-4">

                                <FaCoffee
                                    size={50}
                                    color="#4b2e2e"
                                />

                                <h5
                                    className="mt-3"
                                    style={{
                                        color: '#4b2e2e',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    PROIZVODI
                                </h5>

                                <h2
                                    style={{
                                        color: '#441212',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {products.length}
                                </h2>

                                <p className="mb-0">
                                    Dostupnih proizvoda
                                </p>

                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

            </Container>
        </div>
    );
};

export default AdminDashboardScreen;
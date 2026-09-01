import React from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Table,
    ListGroup,
    Button,
    Spinner,
    Alert,
} from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    useGetMyOrdersQuery,
    useMarkOrderAsPaidMutation,
} from '../slices/orderApiSlice';
const ProfileScreen = () => {
    const navigate = useNavigate();

    const [markOrderAsPaid] = useMarkOrderAsPaidMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const {
        data: orders = [],
        isLoading: ordersLoading,
        error: ordersError,
    } = useGetMyOrdersQuery();

    // Broj uspešnih porudžbina
    const successfulOrders = orders.filter(
        (order) => order.isPaid || order.isDelivered
    ).length;

    // Nakon 5 uspešnih porudžbina korisnik postaje Stalan Gost
    const isLoyalCustomer =
        userInfo?.isLoyalCustomer || successfulOrders >= 5;

    // =========================
    // PODACI O ULOZI KORISNIKA
    // =========================
    const getUserRoleDetails = () => {
        if (!userInfo) {
            return {
                label: 'Gost',
                discount: 0,
                note: 'Prijavite se.',
                color: 'secondary',
            };
        }

        if (userInfo.isAdmin) {
            return {
                label: 'Sistemski Administrator 👑',
                discount: 100,
                note: 'Imate 100% popusta i pristup administratorskim funkcijama.',
                color: 'danger',
            };
        }

        if (userInfo.isManager) {
            return {
                label: 'Menadžer Lokala 👔',
                discount: 100,
                note: 'Kao menadžer imate 100% popusta na porudžbine.',
                color: 'warning',
            };
        }

        if (userInfo.isWaiter) {
            return {
                label: 'Osoblje / Konobar ☕',
                discount: 30,
                note: 'Ostvarujete radnički popust od 30%.',
                color: 'info',
            };
        }

        if (isLoyalCustomer) {
            return {
                label: 'VIP Stalan Gost ⭐',
                discount: 15,
                note: 'Čestitamo! Nakon 5 uspešnih porudžbina ostvarili ste 15% popusta.',
                color: 'success',
            };
        }

        return {
            label: 'Novi Gost ☕',
            discount: 0,
            note: `Napravili ste ${successfulOrders}/5 uspešnih porudžbina. Nakon 5 porudžbina dobijate 15% popusta.`,
            color: 'dark',
        };
    };

    const details = getUserRoleDetails();


    return (
        <Container className="py-5">
            <Row className="justify-content-center">

                <Col md={4} className="mb-4">
                    <Card
                        style={{
                            borderRadius: '20px',
                            border: 'none',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            backgroundColor: '#fbf9f9',
                        }}
                    >
                        <Card.Body className="text-center p-4">

                            <div
                                style={{
                                    fontSize: '60px',
                                    marginBottom: '10px',
                                }}
                            >
                                👤
                            </div>

                            <h3
                                style={{
                                    color: '#4b2e2e',
                                    fontWeight: '700',
                                }}
                            >
                                {userInfo?.name}
                            </h3>

                            <p className="text-muted small">
                                {userInfo?.email}
                            </p>

                            <Badge
                                bg={details.color}
                                className="p-2 px-3 mb-3"
                                style={{
                                    fontSize: '0.9rem',
                                    borderRadius: '10px',
                                }}
                            >
                                {details.label}
                            </Badge>

                            <hr />

                            {/* =================
                               /* POPUST
                            ================= */}

                            <div
                                className="my-4 p-3 rounded"
                                style={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #eee',
                                }}
                            >
                                <h6
                                    className="text-uppercase text-muted small"
                                    style={{ letterSpacing: '1px' }}
                                >
                                    Vaš popust
                                </h6>

                                <h1
                                    style={{
                                        color: '#4b2e2e',
                                        fontWeight: '800',
                                        fontSize: '3rem',
                                    }}
                                >
                                    {details.discount}%
                                </h1>

                                <p className="small text-muted mb-0">
                                    {details.note}
                                </p>
                            </div>

                            {/* =================
                                PORUDŽBINE
                            ================= */}

                            <div
                                className="p-3 mb-4 rounded"
                                style={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #eee',
                                }}
                            >
                                <h6 className="text-muted">
                                    🛍️ Uspešne porudžbine
                                </h6>

                                <h3
                                    style={{
                                        color: '#4b2e2e',
                                        fontWeight: '700',
                                    }}
                                >
                                    {successfulOrders}
                                </h3>

                                {!isLoyalCustomer && (
                                    <small className="text-muted">
                                        Još{' '}
                                        {Math.max(
                                            0,
                                            5 - successfulOrders
                                        )}{' '}
                                        porudžbina do statusa Stalnog Gosta
                                    </small>
                                )}

                                {isLoyalCustomer && (
                                    <small className="text-success fw-bold">
                                        ⭐ Stalni Gost
                                    </small>
                                )}
                            </div>

                            {/* =================
                                KARTICE
                            ================= */}

                            <div className="text-start">

                                <h6
                                    className="fw-bold mb-3"
                                    style={{
                                        color: '#4b2e2e',
                                    }}
                                >
                                    💳 Sačuvane kartice
                                </h6>

                                {userInfo?.savedCards?.length > 0 ? (

                                    <ListGroup variant="flush">

                                        {userInfo.savedCards.map(
                                            (card, index) => (

                                                <ListGroup.Item
                                                    key={index}
                                                    className="bg-transparent"
                                                >
                                                    <strong>
                                                        {card.cardHolder}
                                                    </strong>

                                                    <br />

                                                    {card.brand} • ****{' '}
                                                    {card.last4}

                                                    <br />

                                                    <small>
                                                        Ističe:{' '}
                                                        {card.expiryDate}
                                                    </small>

                                                </ListGroup.Item>
                                            )
                                        )}

                                    </ListGroup>

                                ) : (

                                    <p className="text-muted small">
                                        Nemate sačuvanih kartica.
                                    </p>

                                )}

                                <Button
                                    variant="dark"
                                    size="sm"
                                    className="mt-3 w-100"
                                    onClick={() =>
                                        navigate('/cards')
                                    }
                                >
                                    ➕ Dodaj karticu
                                </Button>

                            </div>

                            {/* =================
                                IZMENA PODATAKA
                            ================= */}

                            <Button
                                variant="outline-dark"
                                className="mt-3 w-100"
                                onClick={() =>
                                    navigate('/edit-profile')
                                }
                            >
                                ✏️ Izmeni podatke
                            </Button>

                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>

                    <Card
                        style={{
                            borderRadius: '20px',
                            border: 'none',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            backgroundColor: '#fbf9f9',
                        }}
                    >

                        <Card.Body className="p-4">

                            <h4
                                className="mb-4"
                                style={{
                                    color: '#4b2e2e',
                                    fontWeight: '700',
                                }}
                            >
                                📜 Istorija porudžbina
                            </h4>

                            {/* LOADING */}

                            {ordersLoading && (
                                <div className="text-center py-4">

                                    <Spinner animation="border" />

                                    <p className="mt-2">
                                        Učitavanje porudžbina...
                                    </p>

                                </div>
                            )}

                            {/* ERROR */}

                            {ordersError && (
                                <Alert variant="danger">
                                    Nije moguće učitati istoriju
                                    porudžbina.
                                </Alert>
                            )}

                            {/* NEMA PORUDŽBINA */}

                            {!ordersLoading &&
                                !ordersError &&
                                orders.length === 0 && (

                                    <Alert variant="info">
                                        Još uvek nemate porudžbina.
                                    </Alert>

                                )}

                            {/* PORUDŽBINE */}

                            {!ordersLoading &&
                                !ordersError &&
                                orders.length > 0 && (

                                    <Table
                                        striped
                                        hover
                                        responsive
                                        className="align-middle bg-white"
                                    >

                                        <thead
                                            style={{
                                                backgroundColor: '#958b90',
                                                color: '#fff',
                                            }}
                                        >

                                            <tr>
                                                <th>ID</th>
                                                <th>Datum</th>
                                                <th>Plaćanje</th>
                                                <th>Ukupno</th>
                                                <th>Popust</th>
                                                <th>Status</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {orders.map((order) => (

                                                <tr key={order._id}>

                                                    <td>
                                                        <strong>
                                                            #
                                                            {order._id
                                                                .slice(-6)
                                                                .toUpperCase()}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString(
                                                            'sr-RS'
                                                        )}
                                                    </td>

                                                    <td>
                                                        {order.paymentMethod}
                                                    </td>

                                                    <td>
                                                        {Number(
                                                            order.totalPrice
                                                        ).toFixed(2)}{' '}
                                                        RSD
                                                    </td>

                                                    <td>
                                                        {order.discountPercentage ||
                                                            0}
                                                        %
                                                    </td>

                                                    <td>
                                                        {order.isDelivered ? (
                                                            <Badge bg="success">
                                                                Isporučeno
                                                            </Badge>
                                                        ) : order.isPaid ? (
                                                            <Badge bg="primary">
                                                                Plaćeno
                                                            </Badge>
                                                        ) : (
                                                            <>
                                                                <Badge bg="warning" className="mb-2">
                                                                    Na čekanju
                                                                </Badge>

                                                                {order.paymentMethod === 'Gotovina' && (
                                                                    <Button
                                                                        variant="success"
                                                                        size="sm"
                                                                        className="d-block"
                                                                        backgroundColor="#997777"
                                                                        color="#211c1cf1f"
                                                                        weight=""
                                                                        onClick={async () => {
                                                                            try {
                                                                                await markOrderAsPaid(
                                                                                    order._id
                                                                                ).unwrap();
                                                                            } catch (error) {
                                                                                console.error(
                                                                                    'Greška:',
                                                                                    error
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        ✓ Označi kao plaćeno
                                                                    </Button>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </Table>

                                )}

                        </Card.Body>

                    </Card>

                </Col>

            </Row>
        </Container>
    );
};

export default ProfileScreen;
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Alert,
    Spinner,
} from 'react-bootstrap';

import { clearCart } from '../slices/cartSlice';
import { useCreateOrderMutation } from '../slices/orderApiSlice';

const OrderScreen = () => {
    const cart = useSelector((state) => state.cart);

    const {
        cartItems = [],
        shippingAddress = {},
        paymentMethod = 'Gotovina',
        selectedCard = null,
        discountPercentage = 0,
        discountAmount = 0,
        totalPrice = 0,
    } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [orderPlaced, setOrderPlaced] = useState(false);

    const [
        createOrder,
        { isLoading: loadingCreateOrder, error: createOrderError },
    ] = useCreateOrderMutation();

    // Cena svih artikala pre popusta
    const rawItemsPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    // Broj artikala
    const totalItems = cartItems.reduce(
        (acc, item) => acc + item.qty,
        0
    );

    const placeOrderHandler = async () => {

        try {
            console.log('ŠALJEM PORUDŽBINU:', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                selectedCard,
            });
            await createOrder({
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                selectedCard,
            }).unwrap();

            // Čistimo korpu tek nakon uspešnog čuvanja
            dispatch(clearCart());

            setOrderPlaced(true);


            setTimeout(() => {
                navigate('/profile');
            }, 3000);

        } catch (error) {
            console.error('Greška pri kreiranju porudžbine:', error);
        }
    };

    if (cartItems.length === 0 && !orderPlaced) {
        navigate('/cart');
        return null;
    }

    if (orderPlaced) {
        return (
            <div
                style={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(135deg, #958b90 0%, #d5c2bc 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card
                    style={{
                        padding: '50px',
                        borderRadius: '30px',
                        textAlign: 'center',
                        border: 'none',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    }}
                >
                    <h1>✅ Porudžbina poslata!</h1>

                    <p className="mt-3">
                        Vaša porudžbina je uspešno sačuvana.
                    </p>

                    <p>
                        Konobar će uskoro doneti porudžbinu za sto{' '}
                        <strong>
                            {shippingAddress.tableNumber}
                        </strong>
                        .
                    </p>

                    <p className="text-muted">
                        Preusmeravanje na profil...
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background:
                    'linear-gradient(135deg, #958b90 0%, #d5c2bc 100%)',
                padding: '40px 0',
            }}
        >
            <Container>
                <h1
                    style={{
                        textAlign: 'center',
                        color: '#441212',
                        fontWeight: 'bold',
                        marginBottom: '40px',
                    }}
                >
                    ☕ Pregled porudžbine
                </h1>

                {createOrderError && (
                    <Alert variant="danger">
                        {createOrderError?.data?.message ||
                            'Greška prilikom kreiranja porudžbine.'}
                    </Alert>
                )}

                <Row>
                    {/* =========================
                        PODACI KUPCA
                    ========================== */}

                    <Col md={8}>
                        <Card
                            className="mb-4"
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                boxShadow:
                                    '0 8px 20px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Card.Body>
                                <h4 className="mb-4">
                                    👤 Podaci kupca
                                </h4>

                                <p>
                                    <strong>Ime:</strong>{' '}
                                    {shippingAddress.name}
                                </p>

                                <p>
                                    <strong>Telefon:</strong>{' '}
                                    {shippingAddress.phone}
                                </p>

                                <p>
                                    <strong>Broj stola:</strong>{' '}
                                    {shippingAddress.tableNumber}
                                </p>

                                <p>
                                    <strong>Način plaćanja:</strong>{' '}
                                    {paymentMethod}
                                </p>

                                {paymentMethod === 'Kartica' &&
                                    selectedCard && (
                                        <div
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, #3b1f1f 0%, #6a3b3b 100%)',
                                                color: '#fff',
                                                borderRadius: '20px',
                                                padding: '25px',
                                                marginTop: '20px',
                                                boxShadow:
                                                    '0 10px 25px rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5>
                                                    💳 Heramatik Card
                                                </h5>

                                                <span>
                                                    {selectedCard.brand ||
                                                        'CARD'}
                                                </span>
                                            </div>

                                            <h4
                                                style={{
                                                    letterSpacing: '3px',
                                                    marginBottom: '25px',
                                                }}
                                            >
                                                **** **** ****{' '}
                                                {selectedCard.last4 ||
                                                    selectedCard}
                                            </h4>

                                            {selectedCard.cardHolder && (
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <small>
                                                            Vlasnik
                                                        </small>

                                                        <div>
                                                            {
                                                                selectedCard.cardHolder
                                                            }
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <small>
                                                            Ističe
                                                        </small>

                                                        <div>
                                                            {
                                                                selectedCard.expiryDate
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <p className="mt-4">
                                    <strong>Napomena:</strong>{' '}
                                    {shippingAddress.note || 'Nema'}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* =========================
                        UKUPNA CENA
                    ========================== */}

                    <Col md={4}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                boxShadow:
                                    '0 8px 20px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Card.Body>
                                <h4
                                    style={{
                                        color: '#441212',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Ukupno
                                </h4>

                                <hr />

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Artikala:</span>

                                    <strong>
                                        {totalItems}
                                    </strong>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Cena artikala:</span>

                                    <span>
                                        {rawItemsPrice.toFixed(2)} RSD
                                    </span>
                                </div>

                                {Number(discountPercentage) > 0 && (
                                    <div
                                        className="d-flex justify-content-between mb-2"
                                        style={{
                                            color: '#28a745',
                                            fontWeight: '600',
                                        }}
                                    >
                                        <span>
                                            Ušteda (
                                            {discountPercentage}%):
                                        </span>

                                        <strong>
                                            -{Number(
                                                discountAmount
                                            ).toFixed(2)}{' '}
                                            RSD
                                        </strong>
                                    </div>
                                )}

                                <hr />

                                <div className="d-flex justify-content-between mb-3 align-items-center">
                                    <span
                                        style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Za uplatu:
                                    </span>

                                    <strong
                                        style={{
                                            color: '#441212',
                                            fontSize: '1.4rem',
                                            fontWeight: '800',
                                        }}
                                    >
                                        {Number(totalPrice).toFixed(2)} RSD
                                    </strong>
                                </div>

                                <Button
                                    className="w-100"
                                    onClick={placeOrderHandler}

                                    disabled={loadingCreateOrder}
                                    style={{
                                        backgroundColor: '#441212',
                                        border: 'none',
                                        borderRadius: '15px',
                                        padding: '12px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {loadingCreateOrder ? (
                                        <>
                                            <Spinner
                                                size="sm"
                                                animation="border"
                                                className="me-2"
                                            />
                                            Slanje...
                                        </>
                                    ) : (
                                        'Potvrdi porudžbinu ☕'
                                    )}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderScreen;
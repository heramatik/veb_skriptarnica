import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    ListGroup,
    Button,
    Badge,
} from 'react-bootstrap';

import {
    removeFromCart,
    increaseQty,
    decreaseQty,
    saveDiscountPercentage,
} from '../slices/cartSlice';

import { FaShoppingCart } from 'react-icons/fa';

const CartScreen = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const increaseQtyHandler = (id) => {
        dispatch(increaseQty(id));
    };

    const decreaseQtyHandler = (id) => {
        dispatch(decreaseQty(id));
    };

    // ODREĐIVANJE POPUSTA NA OSNOVU ULOGE
    const getDiscountPercentage = () => {
        if (!userInfo) return 0;

        if (userInfo.isAdmin || userInfo.isManager) return 100;

        if (userInfo.isWaiter) return 30;

        if (userInfo.isLoyalCustomer) return 15;

        return 0;
    };

    const discount = getDiscountPercentage();

    // UKUPNA CENA SVIH ARTIKALA
    const rawTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    // IZNOS POPUSTA
    const discountAmount = (rawTotal * discount) / 100;

    // CENA NAKON POPUSTA
    const totalAfterDiscount = rawTotal - discountAmount;

    // AUTOMATSKI BAKŠIŠ 10%
    const tipPercentage = 10;
    const tipAmount = (totalAfterDiscount * tipPercentage) / 100;

    // KONAČNA CENA
    const finalTotal = totalAfterDiscount + tipAmount;

    // PRELAZAK NA SLEDEĆI KORAK
    const checkoutHandler = () => {
        dispatch(saveDiscountPercentage(discount));
        navigate('/shipping');
    };

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
                        color: '#441212',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '40px',
                    }}
                >
                    🛒 Vaša korpa
                </h1>

                {cartItems.length === 0 ? (
                    <Card
                        className='p-5 text-center'
                        style={{
                            border: 'none',
                            borderRadius: '25px',
                        }}
                    >
                        <h4>Korpa je prazna ☕</h4>
                    </Card>
                ) : (
                    <Row>

                        {/* ARTIKLI */}
                        <Col md={8}>

                            <ListGroup
                                style={{
                                    borderRadius: '25px',
                                    overflow: 'hidden',
                                    boxShadow:
                                        '0 8px 20px rgba(0,0,0,0.1)',
                                }}
                            >

                                {cartItems.map((item) => (

                                    <ListGroup.Item
                                        key={item.id}
                                        className='d-flex justify-content-between align-items-center'
                                        style={{
                                            padding: '20px',
                                            backgroundColor:
                                                'rgba(255,255,255,0.85)',
                                        }}
                                    >

                                        <div>
                                            <strong>{item.name}</strong>
                                        </div>

                                        <div className='d-flex align-items-center gap-2'>

                                            {/* - */}
                                            <Button
                                                size='sm'
                                                onClick={() =>
                                                    decreaseQtyHandler(item.id)
                                                }
                                                style={{
                                                    backgroundColor: '#ac9e99',
                                                    border: 'none',
                                                    color: '#441212',
                                                    fontWeight: 'bold',
                                                    width: '35px',
                                                }}
                                            >
                                                -
                                            </Button>

                                            {/* KOLIČINA */}
                                            <span
                                                style={{
                                                    fontWeight: 'bold',
                                                    minWidth: '25px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {item.qty}
                                            </span>

                                            {/* + */}
                                            <Button
                                                size='sm'
                                                onClick={() =>
                                                    increaseQtyHandler(item.id)
                                                }
                                                style={{
                                                    backgroundColor: '#789fc3',
                                                    border: 'none',
                                                    fontWeight: 'bold',
                                                    width: '35px',
                                                }}
                                            >
                                                +
                                            </Button>

                                            {/* CENA */}
                                            <span
                                                style={{
                                                    marginLeft: '15px',
                                                    fontWeight: '600',
                                                    color: '#441212',
                                                }}
                                            >
                                                {item.price * item.qty} RSD
                                            </span>

                                            {/* UKLONI */}
                                            <Button
                                                size='sm'
                                                onClick={() =>
                                                    removeFromCartHandler(item.id)
                                                }
                                                style={{
                                                    backgroundColor: '#c06060',
                                                    border: 'none',
                                                    color: '#000000',
                                                    borderRadius: '12px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Ukloni
                                            </Button>

                                        </div>

                                    </ListGroup.Item>

                                ))}

                            </ListGroup>

                        </Col>

                        {/* PREGLED PORUDŽBINE */}
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
                                        <FaShoppingCart /> Pregled porudžbine
                                    </h4>

                                    <hr />

                                    {/* POPUST */}
                                    {discount > 0 && (
                                        <div className='mb-3 text-center'>

                                            <Badge
                                                bg='success'
                                                className='p-2 w-100'
                                                style={{
                                                    fontSize: '0.9rem',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                🎉 Primenjen popust od {discount}%!
                                            </Badge>

                                        </div>
                                    )}

                                    {/* BROJ ARTIKALA */}
                                    <div className='d-flex justify-content-between mb-2'>
                                        <span>Artikli:</span>

                                        <strong>
                                            {cartItems.reduce(
                                                (acc, item) =>
                                                    acc + item.qty,
                                                0
                                            )}
                                        </strong>
                                    </div>

                                    {/* CENA ARTIKALA */}
                                    <div className='d-flex justify-content-between mb-2'>
                                        <span>Cena artikala:</span>

                                        <span>
                                            {rawTotal.toFixed(2)} RSD
                                        </span>
                                    </div>

                                    {/* POPUST */}
                                    {discount > 0 && (
                                        <div
                                            className='d-flex justify-content-between mb-2'
                                            style={{
                                                color: '#28a745',
                                            }}
                                        >
                                            <span>
                                                Ušteda ({discount}%):
                                            </span>

                                            <strong>
                                                -{discountAmount.toFixed(2)} RSD
                                            </strong>
                                        </div>
                                    )}

                                    {/* CENA NAKON POPUSTA */}
                                    {discount > 0 && (
                                        <div className='d-flex justify-content-between mb-2'>
                                            <span>
                                                Nakon popusta:
                                            </span>

                                            <strong>
                                                {totalAfterDiscount.toFixed(2)} RSD
                                            </strong>
                                        </div>
                                    )}

                                    {/* BAKŠIŠ */}
                                    <div
                                        className='d-flex justify-content-between mb-2'
                                        style={{
                                            color: '#8b5e3c',
                                        }}
                                    >
                                        <span>
                                            Bakšiš ({tipPercentage}%):
                                        </span>

                                        <strong>
                                            +{tipAmount.toFixed(2)} RSD
                                        </strong>
                                    </div>

                                    <hr />

                                    {/* UKUPNO */}
                                    <div className='d-flex justify-content-between mb-3'>

                                        <span
                                            style={{
                                                fontSize: '1.2rem',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Ukupno za uplatu:
                                        </span>

                                        <strong
                                            style={{
                                                color: '#441212',
                                                fontSize: '1.4rem',
                                                fontWeight: '800',
                                            }}
                                        >
                                            {finalTotal.toFixed(2)} RSD
                                        </strong>

                                    </div>

                                    {/* NARUČI */}
                                    <Button
                                        className='w-100'
                                        onClick={checkoutHandler}
                                        style={{
                                            backgroundColor: '#665f5f',
                                            border: 'none',
                                            color: '#ffffff',
                                            borderRadius: '15px',
                                            padding: '12px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Naruči
                                    </Button>

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>
                )}

            </Container>
        </div>
    );
};

export default CartScreen;
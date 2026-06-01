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
    saveDiscountPercentage, // DODATO: Uvozimo novu akciju iz cartSlice-a
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

    // FUNKCIJA ZA ODREĐIVANJE POPUSTA NA OSNOVU ULOGE
    const getDiscountPercentage = () => {
        if (!userInfo) return 0; // Ako gost nije ulogovan, popust je 0%
        if (userInfo.isAdmin || userInfo.isManager) return 100; // Admini i menadžeri imaju 100%
        if (userInfo.isWaiter) return 30; // Konobari imaju 30% radnički popust
        if (userInfo.isLoyalCustomer) return 15; // VIP gosti imaju 15%
        return 0; // Običan gost
    };

    const discount = getDiscountPercentage();

    // RAČUNANJE FINANSIJA (za lokalni prikaz na ekranu korpe)
    const rawTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const discountAmount = (rawTotal * discount) / 100;
    const finalTotal = rawTotal - discountAmount;

    // DODATO: Funkcija koja zaključava popust u Redux pre nego što pređeš na sledeći korak
    const checkoutHandler = () => {
        dispatch(saveDiscountPercentage(discount));
        navigate('/shipping'); // Preusmerava na ekran "Podaci za porudžbinu"
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #958b90 0%, #d5c2bc 100%)',
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
                        <Col md={8}>
                            <ListGroup
                                style={{
                                    borderRadius: '25px',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                                }}
                            >
                                {cartItems.map((item) => (
                                    <ListGroup.Item
                                        key={item.id}
                                        className='d-flex justify-content-between align-items-center'
                                        style={{
                                            padding: '20px',
                                            backgroundColor: 'rgba(255,255,255,0.85)',
                                        }}
                                    >
                                        <div>
                                            <strong>{item.name}</strong>
                                        </div>

                                        <div className='d-flex align-items-center gap-2'>
                                            <Button
                                                size='sm'
                                                onClick={() => decreaseQtyHandler(item.id)}
                                                style={{
                                                    backgroundColor: '#ac9e99',
                                                    border: 'none',
                                                    transition: '0.3s',
                                                    color: '#441212',
                                                    fontWeight: 'bold',
                                                    width: '35px',
                                                }}
                                            >
                                                -
                                            </Button>

                                            <span
                                                style={{
                                                    fontWeight: 'bold',
                                                    minWidth: '25px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {item.qty}
                                            </span>

                                            <Button
                                                size='sm'
                                                onClick={() => increaseQtyHandler(item.id)}
                                                style={{
                                                    backgroundColor: '#789fc3',
                                                    transition: '0.3s',
                                                    border: 'none',
                                                    fontWeight: 'bold',
                                                    width: '35px',
                                                }}
                                            >
                                                +
                                            </Button>

                                            <span
                                                style={{
                                                    marginLeft: '15px',
                                                    fontWeight: '600',
                                                    color: '#441212',
                                                }}
                                            >
                                                {item.price * item.qty} RSD
                                            </span>

                                            <Button
                                                size='sm'
                                                onClick={() => removeFromCartHandler(item.id)}
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

                        <Col md={4}>
                            <Card
                                style={{
                                    border: 'none',
                                    borderRadius: '25px',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
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

                                    {/* STATUS POPUSTA */}
                                    {discount > 0 && (
                                        <div className='mb-3 text-center'>
                                            <Badge bg="success" className="p-2 w-100" style={{ fontSize: '0.9rem', borderRadius: '10px' }}>
                                                🎉 Primenjen popust od {discount}%!
                                            </Badge>
                                        </div>
                                    )}

                                    <div className='d-flex justify-content-between mb-2'>
                                        <span>Artikli:</span>
                                        <strong>
                                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                        </strong>
                                    </div>

                                    <div className='d-flex justify-content-between mb-2'>
                                        <span>Cena artikala:</span>
                                        <span>{rawTotal} RSD</span>
                                    </div>

                                    {discount > 0 && (
                                        <div className='d-flex justify-content-between mb-2' style={{ color: '#28a745' }}>
                                            <span>Ušteda ({discount}%):</span>
                                            <strong>-{discountAmount} RSD</strong>
                                        </div>
                                    )}

                                    <hr />

                                    <div className='d-flex justify-content-between mb-3'>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>Ukupno za uplatu:</span>
                                        <strong style={{ color: '#441212', fontSize: '1.4rem', fontWeight: '800' }}>
                                            {finalTotal} RSD
                                        </strong>
                                    </div>

                                    {/* IZMENJENO: onClick sada aktivira checkoutHandler */}
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
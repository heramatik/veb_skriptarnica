import { Container, Row, Col, Card } from 'react-bootstrap';
import VertigoNavbar from '../components/VertigoNavbar';
// Uvoz slike sa promenjenim nazivom promenljive prema tvom zahtevu
import rose from '../assets/images/rose.jpg';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const WineScreen = () => {
    const petrovicWines = [
        {
            id: 101,
            name: 'Sila 0.2l',
            price: 315,
            image: rose,
        },
        {
            id: 102,
            name: 'Rose 0.2l',
            price: 315,
            image: rose,
        },
        {
            id: 103,
            name: 'Merlot 0.2l',
            price: 315,
            image: rose,
        },
        {
            id: 104,
            name: 'Probus 0.2l',
            price: 315,
            image: rose,
        },
    ];

    const dispatch = useDispatch();

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
    };

    const plantazeWines = [
        {
            id: 105,
            name: 'Chardonnay 0.187l',
            price: 395,
            image: rose,
        },
        {
            id: 106,
            name: 'Rose 0.187l',
            price: 395,
            image: rose,
        },
        {
            id: 107,
            name: 'Vranac 0.187l',
            price: 395,
            image: rose,
        },
    ];

    const somersbyCiders = [
        {
            id: 108,
            name: 'Apple 0.33l',
            price: 385,
            image: rose,
        },
        {
            id: 109,
            name: 'Pear 0.33l',
            price: 385,
            image: rose,
        },
        {
            id: 110,
            name: 'Mango 0.33l',
            price: 385,
            image: rose,
        },
        {
            id: 111,
            name: 'Blueberry 0.33l',
            price: 385,
            image: rose,
        },
        {
            id: 112,
            name: 'Raspberry Lime 0.33l',
            price: 385,
            image: rose,
        },
    ];

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8c8dc 0%, #d6f5e3 100%)',
                paddingBottom: '80px',
            }}
        >
            <Container className='py-5'>

                <VertigoNavbar />

                {/* HERO SEKCIJA */}
                <div
                    style={{
                        textAlign: 'center',
                        padding: '50px',
                        borderRadius: '35px',
                        background: 'rgba(255,255,255,0.45)',
                        backdropFilter: 'blur(10px)',
                        marginBottom: '50px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    }}
                >
                    <h1
                        style={{
                            color: '#4b2e2e',
                            fontWeight: '700',
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        }}
                    >
                        🍷 Vinska Karta
                    </h1>
                    <p
                        style={{
                            marginTop: '20px',
                            color: '#5c5c5c',
                            fontSize: '1.1rem',
                        }}
                    >
                        Caffe Vertigo — Pažljivo odabrana selekcija vrhunskih vina iz domaćih
                        i regionalnih podruma, kao i osvežavajućih Somersby ukusa.
                    </p>
                </div>

                {/* GORNJE SLIKE / ISTAKNUTO VINO */}
                <Row className='g-4 mb-5 justify-content-center'>
                    <Col md={5}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                overflow: 'hidden',
                                background: '#fff7fb',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Img
                                src={rose}
                                style={{
                                    height: '380px',
                                    objectFit: 'cover',
                                }}
                            />
                            <Card.Body className='text-center'>
                                <p style={{ fontStyle: 'italic', margin: 0 }}>
                                    "Dan bez vina, dan bez sunca."<br />
                                    <strong style={{ fontStyle: 'normal', color: '#641717' }}>- Francuska poslovica -</strong>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* PREPORUKA KUĆE */}
                    <Col md={5}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                background: 'rgba(255,255,255,0.6)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '30px'
                            }}
                        >
                            <Card.Body className='text-center d-flex flex-column justify-content-center'>
                                <h4 style={{ color: '#641717', fontWeight: '700', marginBottom: '15px' }}>
                                    Preporuka Kuće ✨
                                </h4>
                                <p style={{ fontSize: '1.15rem', color: '#444', fontStyle: 'italic', lineHeight: '1.6' }}>
                                    "Vinarija iz Sremskih Karlovaca<br />
                                    Sila — 'Šampion kvaliteta'<br />
                                    novija sorta belog vina nastala od<br />
                                    čuvenog šardonea i autohtone kevedinke."
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* PODRUM PETROVIĆ */}
                <Card
                    className='mb-5'
                    style={{
                        border: 'none',
                        borderRadius: '30px',
                        background: 'rgba(255,255,255,0.75)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    }}
                >
                    <Card.Body className='p-4'>
                        <h2
                            style={{
                                color: '#4b2e2e',
                                marginBottom: '25px',
                                fontWeight: '700',
                            }}
                        >
                            🍇 Podrum Petrović
                        </h2>

                        {petrovicWines.map((item) => (
                            <div
                                key={item.id}
                                className='d-flex justify-content-between align-items-center mb-3'
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    paddingBottom: '10px',
                                }}
                            >
                                <span>{item.name}</span>

                                <strong>{item.price} RSD</strong>

                                <Button
                                    size='sm'
                                    variant='success'
                                    onClick={() => addToCartHandler(item)}
                                >
                                    Dodaj
                                </Button>
                            </div>
                        ))}
                    </Card.Body>
                </Card>

                {/* PLANTAŽE */}
                <Card
                    className='mb-5'
                    style={{
                        border: 'none',
                        borderRadius: '30px',
                        background: 'rgba(255,255,255,0.75)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    }}
                >
                    <Card.Body className='p-4'>
                        <h2
                            style={{
                                color: '#4b2e2e',
                                marginBottom: '25px',
                                fontWeight: '700',
                            }}
                        >
                            🍾 Plantaže
                        </h2>

                        {plantazeWines.map((item) => (
                            <div
                                key={item.id}
                                className='d-flex justify-content-between align-items-center mb-3'
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    paddingBottom: '10px',
                                }}
                            >
                                <span>{item.name}</span>

                                <strong>{item.price} RSD</strong>

                                <Button
                                    size='sm'
                                    variant='success'
                                    onClick={() => addToCartHandler(item)}
                                >
                                    Dodaj
                                </Button>
                            </div>
                        ))}
                    </Card.Body>
                </Card>

                {/* SOMERSBY */}
                <Card
                    style={{
                        border: 'none',
                        borderRadius: '30px',
                        background: 'rgba(255,255,255,0.75)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    }}
                >
                    <Card.Body className='p-4'>
                        <h2
                            style={{
                                color: '#4b2e2e',
                                marginBottom: '25px',
                                fontWeight: '700',
                            }}
                        >
                            🍏 Somersby
                        </h2>

                        {somersbyCiders.map((item) => (
                            <div
                                key={item.id}
                                className='d-flex justify-content-between align-items-center mb-3'
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    paddingBottom: '10px',
                                }}
                            >
                                <span>{item.name}</span>

                                <strong>{item.price} RSD</strong>

                                <Button
                                    size='sm'
                                    variant='success'
                                    onClick={() => addToCartHandler(item)}
                                >
                                    Dodaj
                                </Button>
                            </div>
                        ))}
                    </Card.Body>
                </Card>
                <ScrollToTopButton />

            </Container>
        </div>
    );
};

export default WineScreen;

import { Container, Row, Col, Card } from 'react-bootstrap';

import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

import cedjeno1 from '../assets/images/rumenko.jpg';
import cedjeno2 from '../assets/images/mix.jpg';
import cedjeno3 from '../assets/images/cedj.jpg';
import cedjeno4 from '../assets/images/spec.jpg';

import VertigoNavbar from '../components/VertigoNavbar';
import ScrollToTopButton from '../components/ScrollToTopButton';

const CedjenoScreen = () => {

    const dispatch = useDispatch();

    const addToCartHandler = (product) => {
        dispatch(
            addToCart({
                ...product,
                qty: 1,
            })
        );
    };
    const juices = [
        { id: 201, name: 'Ceđena narandža', price: 335 },
        { id: 202, name: 'Ceđeni grejpfrut', price: 375 },
        { id: 203, name: 'Ceđena jabuka', price: 315 },
        { id: 204, name: 'Ceđena šargarepa', price: 305 },
        { id: 205, name: 'Ceđeni ananas', price: 445 },
        { id: 206, name: 'Limunada', price: 235 },
        { id: 207, name: 'Limunada đumbir', price: 285 },
        { id: 208, name: 'Limunada Monin', price: 315 },
        { id: 209, name: 'Ice Tea Monin', price: 325 },
    ];
    const mixes = [
        {
            id: 210,
            name: 'Vertigo',
            description: '(narandža, šargarepa, jabuka)',
            price: 385,
        },
        {
            id: 211,
            name: 'Vitaminski',
            description: '(narandža, grejpfrut, limun)',
            price: 385,
        },
        {
            id: 212,
            name: 'Rumenko',
            description: '(narandža, ananas, jagoda, višnja)',
            price: 415,
        },
        {
            id: 213,
            name: 'Special',
            description: '(narandža, malina, jabuka, limun)',
            price: 420,
        },
        {
            id: 214,
            name: 'Fitness',
            description: '(narandža, ananas, jabuka)',
            price: 415,
        },
        {
            id: 215,
            name: 'Elixir',
            description: '(narandža, malina, ananas, med)',
            price: 445,
        },
        {
            id: 216,
            name: 'Gvozdenko',
            description: '(narandža, šargarepa, jabuka, cvekla, đumbir)',
            price: 415,
        },
        {
            id: 217,
            name: 'Mix voća',
            description: '(ceđeno po vašoj želji)',
            price: 445,
        },
        {
            id: 218,
            name: 'Citrus koktel 1',
            description: '(narandža, limun)',
            price: 365,
        },
        {
            id: 219,
            name: 'Citrus koktel 2',
            description: '(narandža, grejpfrut)',
            price: 385,
        },
    ];

    const domestic = [
        { id: 220, name: 'Cvekla', price: 190 },
        { id: 221, name: 'Višnja', price: 190 },
        { id: 222, name: 'Zova', price: 190 },
    ];
    return (
        <div
            style={{
                minHeight: '100vh',
                background:
                    'linear-gradient(135deg, #f8c8dc 0%, #d6f5e3 100%)',
                paddingBottom: '80px',
            }}
        >
            <Container className='py-5'>

                <VertigoNavbar />

                {/* HERO */}

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
                        🍊 Ceđeno Voće
                    </h1>

                    <p
                        style={{
                            marginTop: '20px',
                            color: '#5c5c5c',
                            fontSize: '1.1rem',
                        }}
                    >
                        Prirodni ukusi, sveže ceđeno voće i
                        vitaminski miks napici za svaki deo dana.
                    </p>
                </div>

                {/* GORNJE SLIKE */}

                <Row className='g-4 mb-4 justify-content-center'>

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
                                src={cedjeno1}
                                style={{
                                    height: '350px',
                                    objectFit: 'cover',
                                }}
                            />

                            <Card.Body className='text-center'>
                                <p>
                                    <i>
                                        Savršen ukus u svakoj sezoni.
                                        <br />
                                        - Rumenko -
                                    </i>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

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
                                src={cedjeno2}
                                style={{
                                    height: '350px',
                                    objectFit: 'cover',
                                }}
                            />

                            <Card.Body className='text-center'>
                                <p>
                                    <i>
                                        Čista svežina sa citrusnim aromama.
                                        <br />
                                        - Special -
                                    </i>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                {/* CEDJENI SOKOVI */}

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
                            🍹 Ceđeni sokovi
                        </h2>

                        {juices.map((item) => (
                            <div
                                key={item.id}
                                className='d-flex justify-content-between mb-3'
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

                {/* DONJE SLIKE */}

                <Row className='g-4 mb-4 justify-content-center'>

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
                                src={cedjeno3}
                                style={{
                                    height: '420px',
                                    objectFit: 'cover',
                                }}
                            />

                            <Card.Body className='text-center'>
                                <p>
                                    <i>
                                        Naše omiljeno citrusno osveženje.
                                        <br />
                                        - Gvozdenko -
                                    </i>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

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
                                src={cedjeno4}
                                style={{
                                    height: '420px',
                                    objectFit: 'cover',
                                }}
                            />

                            <Card.Body className='text-center'>
                                <p>
                                    <i>
                                        Vitaminska bomba puna energije.
                                        <br />
                                        - Vertigo Mix -
                                    </i>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                {/* MIKSEVI */}

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
                            🍓 Ceđeni miksevi
                        </h2>

                        {mixes.map((item) => (
                            <div
                                key={item.id}
                                className='d-flex justify-content-between align-items-center mb-4'
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    paddingBottom: '15px',
                                }}
                            >
                                <div>
                                    <strong>{item.name}</strong>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: '#666',
                                            fontSize: '0.95rem',
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </div>

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

                        <div
                            className='d-flex justify-content-between align-items-center mt-3'
                        >
                            <span
                                style={{
                                    color: '#555',
                                    fontWeight: '500',
                                }}
                            >
                                Dodatak: đumbir — 85 RSD
                            </span>

                            <Button
                                size='sm'
                                variant='success'
                                onClick={() =>
                                    addToCartHandler({
                                        id: 223,
                                        name: 'Dodatak đumbir',
                                        price: 85,
                                    })
                                }
                            >
                                Dodaj
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                {/* DOMAĆI */}

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
                            🍒 Domaći sokovi
                        </h2>

                        {domestic.map((item) => (
                            <div
                                key={item.id}
                                className='d-flex justify-content-between mb-3'
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

export default CedjenoScreen;
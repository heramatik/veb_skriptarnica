import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import slika2 from '../assets/images/slika2.jpg';
import sila from '../assets/images/sila.jpg';
import slike2 from '../assets/images/slike2.jpg';
import ScrollToTopButton from '../components/ScrollToTopButton';


const VertigoScreen = () => {
    return (

        <div
            style={{
                minHeight: '100vh',
                background:
                    'linear-gradient(135deg, #f8c8dc 0%, #d6f5e3 100%)',
                paddingBottom: '80px',
            }}
        >
            {/* HERO */}

            <Container className='py-5'>
                <Card
                    style={{
                        border: 'none',
                        borderRadius: '35px',
                        background: 'rgba(255,255,255,0.55)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                        padding: '40px',
                    }}
                >
                    <Row className='align-items-center'>
                        <Col md={7}>
                            <h1
                                style={{
                                    color: '#4b2e2e',
                                    fontWeight: '700',
                                    fontSize: '3.2rem',
                                }}
                            >
                                ☕ Caffe Vertigo
                            </h1>

                            <p
                                style={{
                                    marginTop: '20px',
                                    color: '#5c5c5c',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.8',
                                }}
                            >
                                Malo mirnije mesto u centru grada,
                                savršeno za jutarnju kafu,
                                radnu atmosferu i opuštanje.
                                Poznati smo po sveže ceđenim sokovima,
                                vinskoj karti i prijatnom ambijentu.
                            </p>

                            <div className='d-flex gap-3 mt-4 flex-wrap'>
                                <Link to='/vertigo/menu'>
                                    <Button
                                        style={{
                                            backgroundColor: '#7ed6b3',
                                            border: 'none',
                                            borderRadius: '15px',
                                            padding: '12px 25px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        📖 Glavni meni
                                    </Button>
                                </Link>

                                <Link to='/vertigo/cedjeno'>
                                    <Button
                                        style={{
                                            backgroundColor: '#f8c8dc',
                                            color: '#4b2e2e',
                                            border: 'none',
                                            borderRadius: '15px',
                                            padding: '12px 25px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        🍊 Ceđeno voće
                                    </Button>
                                </Link>

                                <Link to='/vertigo/vina'>
                                    <Button
                                        style={{
                                            backgroundColor: '#fff',
                                            color: '#4b2e2e',
                                            border: 'none',
                                            borderRadius: '15px',
                                            padding: '12px 25px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        🍷 Vinska karta
                                    </Button>
                                </Link>
                            </div>
                        </Col>

                        <Col md={5}>
                            <Card
                                style={{
                                    border: 'none',
                                    borderRadius: '25px',
                                    background: '#fff7fb',
                                    padding: '30px',
                                }}
                            >
                                <h4
                                    style={{
                                        color: '#4b2e2e',
                                        fontWeight: '700',
                                    }}
                                >
                                    📍 Kontakt
                                </h4>

                                <p className='mt-3'>
                                    Instagram:
                                    <br />
                                    <strong>@vertigo.caffe</strong>
                                </p>

                                <p>
                                    Telefon:
                                    <br />
                                    <strong>063 878 14 28</strong>
                                </p>

                                <p>
                                    <b>Miran deo centra grada sa prijatnim
                                        ambijentom i opuštenom atmosferom.</b>
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Container>

            {/* GALERIJA */}

            <Container className='mt-4'>
                <h2
                    className='text-center mb-4'
                    style={{
                        color: '#4b2e2e',
                        fontWeight: '700',
                    }}
                >
                    Ambijent
                </h2>
                <Row className='g-4'>
                    <Col md={4}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                overflow: 'hidden',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Img
                                src={slika2}
                                style={{
                                    height: '320px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                overflow: 'hidden',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Img
                                src={sila}
                                style={{
                                    height: '320px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                overflow: 'hidden',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Img
                                src={slike2}
                                style={{
                                    height: '320px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            <ScrollToTopButton />
                
            </Container>
        </div>
        
    );
};

export default VertigoScreen;
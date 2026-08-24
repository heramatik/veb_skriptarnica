
import { Container, Row, Col, Card } from 'react-bootstrap';
import './MenuScreen.css';
import VertigoNavbar from '../components/VertigoNavbar';
import ScrollToTopButton from '../components/ScrollToTopButton';

import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

import slika1 from '../assets/images/slika1.jpg';
import slika4 from '../assets/images/slika4.jpg';
import slika6 from '../assets/images/slika6.jpg';
import slika5 from '../assets/images/slika5.jpg';
import slika3 from '../assets/images/slika3.jpg';
import shake from '../assets/images/shake.jpg';


const MenuScreen = () => {
    const dispatch = useDispatch();

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
    };
    
    const hotDrinks = [
        { id: 1, name: 'Espresso', price: 190 },
        { id: 2, name: 'Espresso sa mlekom', price: 210 },
        { id: 3, name: 'Cappuccino', price: 210 },
        { id: 4, name: 'Nescafe', price: 235 },
        { id: 5, name: 'Latte', price: 245 },
        { id: 6, name: 'Topla čokolada', price: 255 },
    ];

    const juices = [
        { id: 7, name: 'Coca Cola', price: 255 },
        { id: 8, name: 'Fanta', price: 255 },
        { id: 9, name: 'Sprite', price: 255 },
        { id: 10, name: 'Cockta', price: 255 },
        { id: 11, name: 'Next Breskva', price: 255 },
        { id: 12, name: 'Schweppes Tonic', price: 255 },
    ];

    const beers = [
        { id: 13, name: 'Heineken 0.5', price: 335 },
        { id: 14, name: 'Nektar 0.5', price: 285 },
        { id: 15, name: 'Amstel 0.33', price: 270 },
        { id: 16, name: 'Stella Artois', price: 395 },
    ];

    const cocktails = [
        { id: 17, name: 'Gordons Pink', price: 390 },
        { id: 18, name: 'Classic Gin Tonic', price: 390 },
        { id: 19, name: 'Tanqueray Premium', price: 440 },
    ];

    return (
        <div className='menu-screen'>
            <Container className='py-5'>
                {/*Nav bar */}
                <VertigoNavbar />

                {/* HERO */}

                <div className='menu-hero'>
                    <h1>☕ Caffe Vertigo Menu</h1>

                    <p>
                        Dobrodošli u digitalni meni Caffe Vertigo lokala.
                        Pregledajte našu ponudu toplih napitaka,
                        sokova, piva i koktela. Nadamo se da ce vam se svideti i da cete uzivati u svakom gutljaju!
                    </p>
                </div>

                {/* GALLERY */}

                <Row className='g-4 mb-5'>
                    {[slika1, slika4, slika6].map(
                        (image, index) => (
                            <Col md={4} key={index}>
                                <Card className='gallery-card'>
                                    <Card.Img src={image}
                                        className='gallery-image'
                                    />
                                </Card>
                            </Col>
                        )
                    )}
                </Row>

                {/* HOT DRINKS */}

                <Card className='menu-card mb-5'>
                    <Card.Body>
                        <h2 className='menu-title'>
                            ☕ Topli napici
                        </h2>

                        {hotDrinks.map((item) => (
                            <div
                                className='menu-item'
                                key={item.id}
                            >
                                <span>{item.name}</span>

                                <div className='d-flex align-items-center gap-3'>
                                    <span>{item.price} RSD</span>

                                    <Button
                                        size='sm'
                                        variant='success'
                                        onClick={() => addToCartHandler(item)}
                                    >
                                        Dodaj
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Card.Body>
                </Card>

                {/* JUICES */}

                <Card className='menu-card mb-5'>
                    <Card.Body>
                        <h2 className='menu-title'>
                            🥤 Sokovi
                        </h2>

                        {juices.map((item) => (
                            <div
                                className='menu-item'
                                key={item.id}
                            >
                                <span>{item.name}</span>

                                <div className='d-flex align-items-center gap-3'>
                                    <span>{item.price} RSD</span>

                                    <Button
                                        size='sm'
                                        variant='success'
                                        onClick={() => addToCartHandler(item)}
                                    >
                                        Dodaj
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Card.Body>
                </Card>

                {/* BEERS */}

                <Card className='menu-card mb-5'>
                    <Card.Body>
                        <h2 className='menu-title'>
                            🍺 Pivo
                        </h2>

                        {beers.map((item) => (
                            <div
                                className='menu-item'
                                key={item.id}
                            >
                                <span>{item.name}</span>

                                <div className='d-flex align-items-center gap-3'>
                                    <span>{item.price} RSD</span>

                                    <Button
                                        size='sm'
                                        variant='success'
                                        onClick={() => addToCartHandler(item)}
                                    >
                                        Dodaj
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Card.Body>
                </Card>

                {/* GIN TONIC */}

                <Card className='menu-card mb-5'>
                    <Card.Body>
                        <h2 className='menu-title'>
                            🍸 Gin Tonic
                        </h2>

                        {cocktails.map((item) => (
                            <div
                                className='menu-item'
                                key={item.id}
                            >
                                <span>{item.name}</span>

                                <div className='d-flex align-items-center gap-3'>
                                    <span>{item.price} RSD</span>

                                    <Button
                                        size='sm'
                                        variant='success'
                                        onClick={() => addToCartHandler(item)}
                                    >
                                        Dodaj
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Card.Body>
                </Card>

                {/* CONTACT */}

                <Card className='contact-card'>
                    <Card.Body>
                        <h2 className='menu-title'>
                            📩 Kontaktirajte nas
                        </h2>

                        <form>
                            <input
                                type='text'
                                placeholder='Ime i prezime'
                                className='contact-input'
                            />

                            <input
                                type='email'
                                placeholder='Email adresa'
                                className='contact-input'
                            />

                            <textarea
                                rows='5'
                                placeholder='Vaša poruka'
                                className='contact-input'
                            />

                            <button className='contact-button'>
                                Pošalji
                            </button>
                        </form>
                    </Card.Body>
                </Card>
                <ScrollToTopButton />

            </Container>
        </div>

    );
};

export default MenuScreen;


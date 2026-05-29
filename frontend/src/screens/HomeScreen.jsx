import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCoffee, FaMobileAlt, FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/logo.png';

const HomeScreen = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f8c8dc 0%, #d6f5e3 100%)',
        paddingBottom: '80px',
      }}
    >
      {/* HERO SECTION */}

      <Container className='py-5'>
        <Row className='align-items-center'>
          <Col md={6}>
            <img src={logo} alt="Heramatik Logo" style={{ width: '180px', marginBottom: '50px',}} />
            <h1 style={{  fontSize: '4rem',  fontWeight: 'bold',  color: '#3d2922',}}> Heramatik </h1>
            <p style={{
                fontSize: '1.3rem',
                color: '#5c5c5c',
                marginTop: '20px',
              }} >Digitalna platforma za moderno ugostiteljstvo i jednostavnu komunikaciju između gostiju i lokala.
            </p>

            <div className='mt-4 d-flex gap-3'>
              <Link to='/register'>
                <Button
                  style={{
                    backgroundColor: '#7ed6b3',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '15px',
                    fontWeight: '600',
                  }}
                >
                  Registruj se
                </Button>
              </Link>

              <Link to='/login'>
                <Button
                  variant='light'
                  style={{
                    padding: '12px 28px',
                    borderRadius: '15px',
                    fontWeight: '600',
                    border: 'none',
                  }}
                >
                  Prijava
                </Button>
              </Link>
            </div>
          </Col>

          <Col md={6} className='text-center'>
            <div
              style={{
                background: 'rgba(255,255,255,0.35)',
                backdropFilter: 'blur(10px)',
                borderRadius: '35px',
                padding: '50px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
            >
              <FaCoffee size={90} color='#4b2e2e' />
              <h3 className='mt-4'>Moderni digitalni meni</h3>
              <p>
                Online poručivanje, komunikacija sa konobarima i
                pregled menija u jednom sistemu.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* FEATURES */}

      <Container className='mt-5'>
        <Row className='g-4'>
          <Col md={4}>
            <Card
              style={{
                border: 'none',
                borderRadius: '25px',
                background: '#fff7fb',
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
              }}
            >
              <Card.Body className='text-center p-4'>
                <FaMobileAlt size={45} color='#7ed6b3' />
                <h4 className='mt-3'>Digitalni meni</h4>
                <p>
                  Pregled kompletnog menija direktno sa telefona.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{
                border: 'none',
                borderRadius: '25px',
                background: '#fff7fb',
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
              }}
            >
              <Card.Body className='text-center p-4'>
                <FaShoppingCart size={45} color='#7ed6b3' />
                <h4 className='mt-3'>Online poručivanje</h4>
                <p>
                  Dodavanje proizvoda u korpu i brzo plaćanje.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{
                border: 'none',
                borderRadius: '25px',
                background: '#fff7fb',
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
              }}
            >
              <Card.Body className='text-center p-4'>
                <FaCoffee size={45} color='#7ed6b3' />
                <h4 className='mt-3'>Komunikacija</h4>
                <p>
                  Jednostavna komunikacija između gostiju i osoblja.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CAFFE SECTION */}

      <Container className='mt-5'>
        <h2
          className='text-center mb-4'
          style={{
            color: '#4b2e2e',
            fontWeight: '700',
          }}
        >
          Dostupni objekti
        </h2>

        <Row className='justify-content-center'>
          <Col md={5}>
            <Card
              style={{
                border: 'none',
                borderRadius: '30px',
                background: '#fff',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              }}
            >
              <Card.Body className='text-center p-5'>
                <h3 style={{ color: '#4b2e2e' }}>
                  ☕ Caffe Vertigo
                </h3>

                <p className='mt-3'>
                    Prvi digitalizovani lokal unutar Heramatik platforme.
                </p>

                <Link to='/vertigo'>
                  <Button
                    style={{
                      backgroundColor: '#f8c8dc',
                      color: '#4b2e2e',
                      border: 'none',
                      padding: '12px 25px',
                      borderRadius: '15px',
                      fontWeight: '600',
                    }}
                  >
                    Istraži lokal
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
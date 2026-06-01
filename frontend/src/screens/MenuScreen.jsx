import { Container, Row, Col, Card } from 'react-bootstrap';

const MenuScreen = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f8c8dc 0%, #d6f5e3 100%)',
        padding: '50px 0',
      }}
    >
      <Container>
        <h1
          className='text-center mb-5'
          style={{
            color: '#4b2e2e',
            fontWeight: '700',
            fontSize: '3rem',
          }}
        >
          ☕ Vertigo Menu
        </h1>

        <Row className='g-4'>

          {/* KAFA */}

          <Col md={6}>
            <Card
              style={{
                border: 'none',
                borderRadius: '30px',
                background: '#fff7fb',
                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
              }}
            >
              <Card.Body className='p-4'>
                <h3
                  style={{
                    color: '#4b2e2e',
                    marginBottom: '25px',
                  }}
                >
                  ☕ Kafa
                </h3>

                {[
                  ['Espresso', '210 RSD'],
                  ['Cappuccino', '290 RSD'],
                  ['Latte', '320 RSD'],
                  ['Flat White', '340 RSD'],
                  ['Ice Coffee', '390 RSD'],
                ].map((item) => (
                  <div
                    key={item[0]}
                    className='d-flex justify-content-between mb-3'
                  >
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* OSVEŽENJE */}

          <Col md={6}>
            <Card
              style={{
                border: 'none',
                borderRadius: '30px',
                background: '#fff7fb',
                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
              }}
            >
              <Card.Body className='p-4'>
                <h3
                  style={{
                    color: '#4b2e2e',
                    marginBottom: '25px',
                  }}
                >
                  🥤 Osveženje
                </h3>

                {[
                  ['Limunada', '235 RSD'],
                  ['Ice Tea', '325 RSD'],
                  ['Fresh Orange', '335 RSD'],
                  ['Fresh Grejp', '375 RSD'],
                  ['Smoothie', '420 RSD'],
                ].map((item) => (
                  <div
                    key={item[0]}
                    className='d-flex justify-content-between mb-3'
                  >
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* DEZERT */}

          <Col md={6}>
            <Card
              style={{
                border: 'none',
                borderRadius: '30px',
                background: '#fff7fb',
                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
              }}
            >
              <Card.Body className='p-4'>
                <h3
                  style={{
                    color: '#4b2e2e',
                    marginBottom: '25px',
                  }}
                >
                  🍰 Dezerti
                </h3>

                {[
                  ['Cheesecake', '420 RSD'],
                  ['Tiramisu', '390 RSD'],
                  ['Čokoladni kolač', '410 RSD'],
                  ['Palačinke', '450 RSD'],
                ].map((item) => (
                  <div
                    key={item[0]}
                    className='d-flex justify-content-between mb-3'
                  >
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* ALKOHOL */}

          <Col md={6}>
            <Card
              style={{
                border: 'none',
                borderRadius: '30px',
                background: '#fff7fb',
                boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
              }}
            >
              <Card.Body className='p-4'>
                <h3
                  style={{
                    color: '#4b2e2e',
                    marginBottom: '25px',
                  }}
                >
                  🍷 Alkohol
                </h3>

                {[
                  ['Gin Tonic', '590 RSD'],
                  ['Aperol Spritz', '650 RSD'],
                  ['Somersby', '385 RSD'],
                  ['Vino čaša', '315 RSD'],
                ].map((item) => (
                  <div
                    key={item[0]}
                    className='d-flex justify-content-between mb-3'
                  >
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default MenuScreen;
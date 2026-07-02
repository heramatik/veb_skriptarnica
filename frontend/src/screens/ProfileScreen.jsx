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
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';


const ProfileScreen = () => {
    const navigate = useNavigate();

    // Izvlačimo userInfo iz auth stanja u Reduxu
    const { userInfo } = useSelector((state) => state.auth);

    // Funkcija koja analizira Boolean vrednosti i vraća podatke o popustu i specifikacijama
    const getUserRoleDetails = () => {
        if (!userInfo) return { label: 'Gost', discount: 0, note: 'Prijavite se.', color: 'secondary' };

        if (userInfo.isAdmin) {
            return {
                label: 'Sistemski Administrator 👑',
                discount: 100,
                note: 'Kao kreator platforme, imate 100% popusta i besplatan pristup svim funkcijama i lokalima.',
                color: 'danger',
                specifications: ['Kreiranje i brisanje objekata', 'Upravljanje ulogama korisnika', 'Uvid u kompletan promet']
            };
        }
        if (userInfo.isManager) {
            return {
                label: 'Menadžer Lokala 👔',
                discount: 100,
                note: 'Kao menadžer objekta, sve Vaše porudžbine unutar lokala su potpuno besplatne (100% popusta).',
                color: 'warning',
                specifications: ['Uređivanje digitalnog menija', 'Pregled dnevnih izveštaja', 'Upravljanje konobarima']
            };
        }
        if (userInfo.isWaiter) {
            return {
                label: 'Osoblje / Konobar ☕',
                discount: 30,
                note: 'Ostvarujete radnički popust od 30% na sve artikle tokom smene.',
                color: 'info',
                specifications: ['Pregled i isporuka porudžbina', 'Direktna komunikacija sa šankom/kuhinjom']
            };
        }
        if (userInfo.isLoyalCustomer) {
            return {
                label: 'VIP Stalan Gost ⭐',
                discount: 15,
                note: 'Hvala Vam na vernosti! Kao stalnom gostu, automatski Vam se obračunava 15% popusta na svaku porudžbinu.',
                color: 'success',
                specifications: ['Prioritetna priprema porudžbine', 'Učešće u loyalty programima']
            };
        }

        // Default: Običan novi gost
        return {
            label: 'Novi Gost ☕',
            discount: 0,
            note: 'Dobrodošli! Nakon 5 uspešnih porudžbina postajete Stalan Gost i otključavate 15% popusta.',
            color: 'dark',
            specifications: ['Pregled menija', 'Online poručivanje sa stola']
        };
    };

    const details = getUserRoleDetails();

    return (
        <Container className='py-5'>
            <Row className='justify-content-center'>

                {/* LEVA STRANA: KARTICA SA PROFILOM I POPUSTIMA */}
                <Col md={4} className='mb-4'>
                    <Card style={{
                        borderRadius: '20px',
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        backgroundColor: '#fbf9f9'
                    }}>
                        <Card.Body className='text-center p-4'>
                            <div style={{ fontSize: '60px', marginBottom: '10px' }}>👤</div>
                            <h3 style={{ color: '#4b2e2e', fontWeight: '700' }}>{userInfo?.name}</h3>
                            <p className='text-muted small mb-3'>{userInfo?.email}</p>

                            <Badge bg={details.color} className='p-2 px-3 mb-4' style={{ fontSize: '0.9rem', borderRadius: '10px' }}>
                                {details.label}
                            </Badge>

                            <hr style={{ borderColor: '#4b2e2e', opacity: '0.2' }} />

                            {/* Sekcija za popust */}
                            <div className='my-4 p-3 rounded' style={{ backgroundColor: '#fff', border: '1px solid #eee' }}>
                                <h6 className='text-uppercase text-muted small' style={{ letterSpacing: '1px' }}>Vaš Popust</h6>
                                <h1 style={{ color: '#4b2e2e', fontWeight: '800', fontSize: '3rem', margin: '10px 0' }}>
                                    {details.discount}%
                                </h1>
                                <p className='small text-muted mb-0 px-2' style={{ lineHeight: '1.4' }}>
                                    {details.note}
                                </p>
                            </div>

                            <hr style={{ borderColor: '#4b2e2e', opacity: '0.2' }} />

                            <div className='text-start mt-3'>
                                <h6
                                    className='fw-bold mb-3'
                                    style={{ color: '#4b2e2e' }}
                                >
                                    💳 Sačuvane kartice
                                </h6>

                                {userInfo?.savedCards?.length > 0 ? (
                                    <ListGroup variant='flush'>
                                        {userInfo.savedCards.map((card, index) => (
                                            <ListGroup.Item
                                                key={index}
                                                className='bg-transparent'
                                            >
                                                <strong>{card.cardHolder}</strong>
                                                <br />
                                                **** **** ****{' '}
                                                {card.cardNumber.slice(-4)}
                                                <br />
                                                Ističe: {card.expiryDate}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p className='text-muted small'>
                                        Nemate sačuvanih kartica.
                                    </p>
                                )}
                                <Button
                                    variant='dark'
                                    size='sm'
                                    className='mt-3'
                                    onClick={() => navigate('/cards')}
                                >
                                    ➕ Dodaj karticu
                                </Button>

                            </div>


                        </Card.Body>
                    </Card>
                </Col>

                {/* DESNA STRANA: ISTORIJA PORUČIVANJA */}
                <Col md={8}>
                    <Card style={{
                        borderRadius: '20px',
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        backgroundColor: '#fbf9f9'
                    }}>
                        <Card.Body className='p-4'>
                            <h4 className='mb-4 d-flex align-items-center gap-2' style={{ color: '#4b2e2e', fontWeight: '700' }}>
                                📜 Istorija porudžbina
                            </h4>

                            <Table striped hover responsive className='align-middle bg-white rounded shadow-sm' style={{ overflow: 'hidden' }}>
                                <thead style={{ backgroundColor: '#958b90', color: '#fff' }}>
                                    <tr>
                                        <th className='p-3'>ID Porudžbine</th>
                                        <th className='p-3'>Datum</th>
                                        <th className='p-3'>Ukupno</th>
                                        <th className='p-3'>Popust</th>
                                        <th className='p-3'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Statičan primer, kasnije mapiraš prave podatke */}
                                    <tr>
                                        <td className='p-3 fw-bold'>#84920</td>
                                        <td className='p-3'>31.05.2026.</td>
                                        <td className='p-3'>{details.discount === 100 ? '0 RSD' : '1.450 RSD'}</td>
                                        <td className='p-3'>{details.discount}%</td>
                                        <td className='p-3'>
                                            <Badge bg="success" className='p-2' style={{ borderRadius: '5px' }}>
                                                Isporučeno
                                            </Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    );
};

export default ProfileScreen;
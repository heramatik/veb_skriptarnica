import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // IZMENJENO: Dodat useSelector
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Card,
    Form,
    Button,
} from 'react-bootstrap';

import { saveShippingAddress } from '../slices/cartSlice';


const ShippingScreen = () => {
    // 1. Izvlačimo userInfo iz auth stanja i shippingAddress iz cart stanja
    const { userInfo } = useSelector((state) => state.auth);
    const { shippingAddress } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 2. Automatsko popunjavanje: prva opcija je već uneta adresa, druga je nalog, treća je prazno polje
    // Prvo gledamo userInfo (ulogovanu Milenu), pa tek onda šta je ostalo u korpi
    const [name, setName] = useState(userInfo?.name || shippingAddress?.name || '');
    const [phone, setPhone] = useState(userInfo?.phone || shippingAddress?.phone || '');
    // Broj stola i napomena se uglavnom unose sveže pri svakoj porudžbini
    const [tableNumber, setTableNumber] = useState(shippingAddress?.tableNumber || '');
    const [note, setNote] = useState(shippingAddress?.note || '');

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            saveShippingAddress({
                name,
                phone,
                tableNumber,
                note,
            })
        );

        navigate('/payment');
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
            <Container style={{ maxWidth: '650px' }}>
                <Card
                    style={{
                        border: 'none',
                        borderRadius: '30px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    }}
                >
                    <Card.Body className='p-5'>
                        <h2
                            className='text-center mb-4'
                            style={{
                                color: '#441212',
                                fontWeight: 'bold',
                            }}
                        >
                            ☕ Podaci za porudžbinu
                        </h2>

                        <Form onSubmit={submitHandler}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Ime</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Telefon</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Broj stola</Form.Label>
                                <Form.Control
                                    type='number'
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-4'>
                                <Form.Label>Napomena</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={3}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder='Bez leda, dodatni šećer...'
                                />
                            </Form.Group>

                            <Button
                                type='submit'
                                className='w-100'
                                style={{
                                    backgroundColor: '#441212',
                                    border: 'none',
                                    borderRadius: '15px',
                                    padding: '12px',
                                    fontWeight: '600',
                                }}
                            >
                                Nastavi
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ShippingScreen;
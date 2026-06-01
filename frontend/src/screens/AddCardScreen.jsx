import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAddCardMutation } from '../slices/userApiSlice';
const AddCardScreen = () => {
    const navigate = useNavigate();

    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const [addCard] = useAddCardMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await addCard({
                cardHolder,
                cardNumber,
                expiryDate,
            }).unwrap();

            alert('Kartica uspešno dodata');

            navigate('/profile');
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <Container style={{ maxWidth: '600px' }} className='py-5'>
            <Card className='p-4'>
                <h2 className='mb-4'>💳 Dodavanje kartice</h2>

                <Form onSubmit={submitHandler}>

                    <Form.Group className='mb-3'>
                        <Form.Label>Vlasnik kartice</Form.Label>
                        <Form.Control
                            type='text'
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder='Marko Marković'
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Broj kartice</Form.Label>
                        <Form.Control
                            type='text'
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder='1234 5678 9012 3456'
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-4'>
                        <Form.Label>Datum isteka</Form.Label>
                        <Form.Control
                            type='text'
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder='12/29'
                            required
                        />
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='dark'
                        className='w-100'
                    >
                        Sačuvaj karticu
                    </Button>

                </Form>
            </Card>
        </Container>
    );
};

export default AddCardScreen;
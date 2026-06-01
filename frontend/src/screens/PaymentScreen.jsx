import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // DODATO: useSelector
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('Gotovina');
    const [selectedCard, setSelectedCard] = useState(''); // Za pamćenje izabrane kartice

    const { userInfo } = useSelector((state) => state.auth); // Uzimamo podatke korisnika
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // Šaljemo metodu, a ako je kartica, šaljemo i detalje kartice
        dispatch(savePaymentMethod({ method: paymentMethod, card: selectedCard }));
        navigate('/order');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #958b90 0%, #d5c2bc 100%)', padding: '40px 0' }}>
            <Container style={{ maxWidth: '600px' }}>
                <Card style={{ border: 'none', borderRadius: '30px', padding: '30px' }}>
                    <h2 className='mb-4'>💳 Način plaćanja</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Check type='radio' label='Gotovina' value='Gotovina' checked={paymentMethod === 'Gotovina'} onChange={(e) => setPaymentMethod(e.target.value)} className='mb-3' />
                        
                        <Form.Check type='radio' label='Kartica' value='Kartica' checked={paymentMethod === 'Kartica'} onChange={(e) => setPaymentMethod(e.target.value)} className='mb-3' />

                        {/* Prikaz kartica samo ako je izabrana opcija 'Kartica' */}
                        {paymentMethod === 'Kartica' && (
                            <div className="ms-4 mb-4">
                                {userInfo?.savedCards?.length > 0 ? (
                                    userInfo.savedCards.map((card) => (
                                        <Form.Check
                                            key={card.paymentMethodId}
                                            type='radio'
                                            label={`${card.brand} **** ${card.last4}`}
                                            name='cardSelection'
                                            onChange={() => setSelectedCard(card)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-muted">Nemate sačuvanih kartica. Dodajte karticu u profilu.</p>
                                )}
                            </div>
                        )}

                        <Button type='submit' className='w-100' disabled={paymentMethod === 'Kartica' && !selectedCard}>
                            Nastavi
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};
export default PaymentScreen;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [paymentMethod, setPaymentMethod] = useState('Gotovina');
    const [selectedCard, setSelectedCard] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            savePaymentMethod({
                method: paymentMethod,
                card: selectedCard,
            })
        );

        navigate('/order');
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
            <Container style={{ maxWidth: '600px' }}>
                <Card
                    style={{
                        border: 'none',
                        borderRadius: '30px',
                        padding: '30px',
                    }}
                >
                    <h2 className='mb-4'>💳 Način plaćanja</h2>

                    <Form onSubmit={submitHandler}>
                        <Form.Check
                            type='radio'
                            label='Gotovina'
                            value='Gotovina'
                            checked={paymentMethod === 'Gotovina'}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                            className='mb-3'
                        />

                        <Form.Check
                            type='radio'
                            label='Kartica'
                            value='Kartica'
                            checked={paymentMethod === 'Kartica'}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                            className='mb-3'
                        />

                        {paymentMethod === 'Kartica' && (
                            <div className='ms-3 mb-4'>

                                <h5 className='mb-3'>
                                    Izaberite karticu
                                </h5>

                                {userInfo?.savedCards?.length > 0 ? (
                                    userInfo.savedCards.map(
                                        (card, index) => (
                                            <Form.Check
                                                key={index}
                                                type='radio'
                                                name='selectedCard'
                                                label={`${card.cardHolder} - **** ${card.cardNumber.slice(-4)}`}
                                                onChange={() =>
                                                    setSelectedCard(card)
                                                }
                                                className='mb-2'
                                            />
                                        )
                                    )
                                ) : (
                                    <div>
                                        <p className='text-muted'>
                                            Nemate sačuvanih kartica.
                                        </p>

                                        <Button
                                            variant='dark'
                                            size='sm'
                                            onClick={() =>
                                                navigate('/add-card')
                                            }
                                        >
                                            ➕ Dodaj karticu
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                        <Button
                            type='submit'
                            className='w-100'
                            disabled={
                                paymentMethod === 'Kartica' &&
                                !selectedCard
                            }
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
                </Card>
            </Container>
        </div>
    );
};

export default PaymentScreen;
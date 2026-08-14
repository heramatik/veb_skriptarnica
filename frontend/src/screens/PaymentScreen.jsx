import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useGetCardsQuery } from '../slices/userApiSlice';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import {
    savePaymentMethod,
    saveSelectedCard,
} from '../slices/cartSlice';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('Gotovina');
    const [selectedCard, setSelectedCard] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const { userInfo } = useSelector((state) => state.auth);
    const {
        data: savedCards = [],
        isLoading,
    } = useGetCardsQuery();

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));

        if (paymentMethod === 'Kartica') {
            dispatch(saveSelectedCard(selectedCard));
        }

        navigate('/order');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <h1>Način plaćanja</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-4'>
                    <Form.Label as='legend'>
                        Odaberite način plaćanja
                    </Form.Label>

                    <Form.Check
                        type='radio'
                        className='my-2'
                        label='Gotovina'
                        id='Gotovina'
                        name='paymentMethod'
                        value='Gotovina'
                        checked={paymentMethod === 'Gotovina'}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />

                    <Form.Check
                        type='radio'
                        className='my-2'
                        label='Kartica'
                        id='Kartica'
                        name='paymentMethod'
                        value='Kartica'
                        checked={paymentMethod === 'Kartica'}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />
                </Form.Group>

                {paymentMethod === 'Kartica' && (
                    <Form.Group className='mb-4'>
                        <Form.Label as='legend'>
                            Izaberite karticu
                        </Form.Label>

                        {isLoading ? (
                            <p>Učitavanje kartica...</p>
                        ) : savedCards.length > 0 ? (
                            savedCards.map((card, index) => (
                                <Form.Check
                                    key={index}
                                    type='radio'
                                    name='selectedCard'
                                    id={`card-${index}`}
                                    label={`${card.cardHolder} - **** ${card.last4}`}
                                    checked={
                                        selectedCard === card.last4
                                    }
                                    onChange={() =>
                                        setSelectedCard(card.last4)
                                    }
                                    className='my-2'
                                />
                            ))
                        ) : (
                            <div>
                                <p className='text-muted'>
                                    Nemate sačuvanih kartica.
                                </p>

                                <Button
                                    type='button'
                                    variant='dark'
                                    onClick={() =>
                                        navigate('/cards')
                                    }
                                >
                                    ➕ Dodaj karticu
                                </Button>
                            </div>
                        )}
                    </Form.Group>
                )}

                <Button
                    type='submit'
                    variant='primary'
                    disabled={
                        paymentMethod === 'Kartica' &&
                        !selectedCard
                    }
                >
                    Nastavite
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
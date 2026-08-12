import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

   const submitHandler = async (e) => {
    e.preventDefault();

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    try {
        const res = await login({
            email,
            password,
        }).unwrap();

        console.log("LOGIN RESPONSE:", res);

        dispatch(setCredentials(res));
        navigate('/');
    } catch (err) {
        console.log("LOGIN ERROR:", err);
        alert('Pogrešan email ili lozinka');
    }
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
            <Container style={{ maxWidth: '550px' }}>
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
                            👤 Prijava
                        </h2>

                        <Form onSubmit={submitHandler}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>

                                <Form.Control
                                    type='email'
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-4'>
                                <Form.Label>Lozinka</Form.Label>

                                <Form.Control
                                    type='password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
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
                                }}
                            >
                                Prijavi se
                            </Button>
                        </Form>

                        <div className='text-center mt-4'>
                            Nemate nalog?{' '}
                            <Link to='/register'>
                                Registrujte se
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginScreen;
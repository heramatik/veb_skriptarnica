import { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAdminLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const AdminLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [adminLogin, { isLoading }] = useAdminLoginMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await adminLogin({
                email,
                password,
            }).unwrap();

            dispatch(setCredentials(res));

            navigate('/admin');

        } catch (error) {
            alert(
                error?.data?.message ||
                'Greška prilikom admin prijave'
            );
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '80vh' }}
        >
            <Card
                style={{
                    width: '450px',
                    borderRadius: '25px',
                    padding: '30px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }}
            >
                <Card.Body>

                    <h2
                        className="text-center mb-4"
                        style={{
                            color: '#441212',
                            fontWeight: 'bold',
                        }}
                    >
                        👑 Admin prijava
                    </h2>

                    <Form onSubmit={submitHandler}>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                Admin email
                            </Form.Label>

                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>
                                Admin šifra
                            </Form.Label>

                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                            disabled={isLoading}
                            style={{
                                backgroundColor: '#441212',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '12px',
                            }}
                        >
                            {isLoading
                                ? 'Prijavljivanje...'
                                : '👑 Prijavi se kao administrator'}
                        </Button>

                    </Form>

                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminLoginScreen;
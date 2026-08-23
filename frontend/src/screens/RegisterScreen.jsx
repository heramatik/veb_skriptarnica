import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // NOVO
    const [role, setRole] = useState('guest');
    const [roleCode, setRoleCode] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Lozinke se ne podudaraju!');
            return;
        }

        // Ako je izabrana službena uloga, mora postojati šifra
        if ((role === 'waiter' || role === 'manager') && !roleCode) {
            alert('Morate uneti šifru za izbor ove uloge.');
            return;
        }

        try {
            const res = await register({
                name,
                email,
                phone,
                address,
                password,
                role,
                roleCode,
            }).unwrap();

            dispatch(setCredentials(res));

            navigate('/');
        } catch (err) {
            alert(err?.data?.message || 'Greška prilikom registracije');
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
            <Container style={{ maxWidth: '600px' }}>
                <Card
                    style={{
                        border: 'none',
                        borderRadius: '30px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    }}
                >
                    <Card.Body className="p-5">

                        <h2
                            className="text-center mb-4"
                            style={{
                                color: '#441212',
                                fontWeight: 'bold',
                            }}
                        >
                            📝 Registracija Naloga
                        </h2>

                        <Form onSubmit={submitHandler}>

                            {/* IME */}
                            <Form.Group
                                className="mb-3"
                                controlId="name"
                            >
                                <Form.Label>
                                    Ime i prezime
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    placeholder="Zoran Zorić"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>

                            {/* EMAIL */}
                            <Form.Group
                                className="mb-3"
                                controlId="email"
                            >
                                <Form.Label>
                                    Email adresa
                                </Form.Label>

                                <Form.Control
                                    type="email"
                                    placeholder="tvoj-mejl@gmail.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>

                            {/* TELEFON */}
                            <Form.Group
                                className="mb-3"
                                controlId="phone"
                            >
                                <Form.Label>
                                    Broj telefona
                                </Form.Label>

                                <Form.Control
                                    type="tel"
                                    pattern="[0-9]{9,11}"
                                    placeholder="0641234567"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>

                            {/* ADRESA */}
                            <Form.Group
                                className="mb-3"
                                controlId="address"
                            >
                                <Form.Label>
                                    Adresa stanovanja
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    placeholder="Bulevar Oslobođenja 21, Novi Sad"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>

                            {/* ULOGA */}
                            <Form.Group
                                className="mb-3"
                                controlId="role"
                            >
                                <Form.Label>
                                    <strong>👤 Uloga korisnika</strong>
                                </Form.Label>

                                <Form.Select
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);

                                        // Ako se vrati na gosta,
                                        // brišemo šifru
                                        if (e.target.value === 'guest') {
                                            setRoleCode('');
                                        }
                                    }}
                                >
                                    <option value="guest">
                                        ☕ Gost
                                    </option>

                                    <option value="waiter">
                                        🧑‍🍳 Konobar
                                    </option>

                                    <option value="manager">
                                        👔 Menadžer
                                    </option>
                                </Form.Select>

                                <Form.Text className="text-muted">
                                    Gost ne zahteva dodatnu šifru.
                                    Za Konobara i Menadžera potrebna je
                                    posebna šifra.
                                </Form.Text>
                            </Form.Group>

                            {/* ŠIFRA ZA ULOGU */}
                            {(role === 'waiter' ||
                                role === 'manager') && (
                                <Form.Group
                                    className="mb-3"
                                    controlId="roleCode"
                                >
                                    <Form.Label>
                                        🔐 Šifra za izbor uloge
                                    </Form.Label>

                                    <Form.Control
                                        type="password"
                                        placeholder="Unesite šifru"
                                        value={roleCode}
                                        onChange={(e) =>
                                            setRoleCode(e.target.value)
                                        }
                                        required
                                    />

                                    <Form.Text className="text-muted">
                                        Ova šifra je potrebna za
                                        registraciju zaposlenih.
                                    </Form.Text>
                                </Form.Group>
                            )}

                            {/* LOZINKA */}
                            <Form.Group
                                className="mb-3"
                                controlId="password"
                            >
                                <Form.Label>
                                    Lozinka
                                </Form.Label>

                                <Form.Control
                                    type="password"
                                    placeholder="Unesite lozinku"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>

                            {/* POTVRDA LOZINKE */}
                            <Form.Group
                                className="mb-4"
                                controlId="confirmPassword"
                            >
                                <Form.Label>
                                    Potvrdite lozinku
                                </Form.Label>

                                <Form.Control
                                    type="password"
                                    placeholder="Ponovite lozinku"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>

                            {/* REGISTRACIJA */}
                            <Button
                                type="submit"
                                className="w-100 mb-3"
                                disabled={isLoading}
                                style={{
                                    backgroundColor: '#441212',
                                    border: 'none',
                                    borderRadius: '15px',
                                    padding: '12px',
                                    fontWeight: '600',
                                }}
                            >
                                {isLoading
                                    ? 'Registracija...'
                                    : 'Registruj se ☕'}
                            </Button>

                            <Row className="py-2 text-center">
                                <Col>
                                    Već imate nalog?{' '}

                                    <Link
                                        to="/login"
                                        style={{
                                            color: '#441212',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Prijavite se
                                    </Link>
                                </Col>
                            </Row>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default RegisterScreen;
import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import { useUpdateProfileMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const EditProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(userInfo?.name || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [phone, setPhone] = useState(userInfo?.phone || '');
    const [address, setAddress] = useState(userInfo?.address || '');
    const [password, setPassword] = useState('');

    const [updateProfile, { isLoading }] =
        useUpdateProfileMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const updatedUser = await updateProfile({
                name,
                email,
                phone,
                address,
                password,
            }).unwrap();

            dispatch(setCredentials(updatedUser));

            alert('Podaci su uspešno izmenjeni.');

            navigate('/profile');

        } catch (err) {
            alert(
                err?.data?.message ||
                'Greška prilikom izmene podataka'
            );
        }
    };

    return (
        <FormContainer>

            <Card className="p-4">

                <h1 className="mb-4">
                    ✏️ Izmena podataka
                </h1>

                <Form onSubmit={submitHandler}>

                    <Form.Group className="mb-3">
                        <Form.Label>Ime i prezime</Form.Label>

                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>

                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Broj telefona</Form.Label>

                        <Form.Control
                            type="text"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Adresa</Form.Label>

                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>
                            Nova lozinka
                        </Form.Label>

                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Ostavite prazno ako ne menjate lozinku"
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="dark"
                        className="w-100"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Čuvanje...'
                            : 'Sačuvaj izmene'}
                    </Button>

                    <Button
                        type="button"
                        variant="outline-secondary"
                        className="w-100 mt-2"
                        onClick={() =>
                            navigate('/profile')
                        }
                    >
                        Odustani
                    </Button>

                </Form>

            </Card>

        </FormContainer>
    );
};

export default EditProfileScreen;
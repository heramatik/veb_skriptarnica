import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    Form,
    Modal,
    Badge,
    Alert,
} from 'react-bootstrap';

import {
    FaUsers,
    FaUserPlus,
    FaEye,
    FaTrash,
    FaSearch,
    FaUserEdit,
} from 'react-icons/fa';

import {
    useGetUsersQuery,
    useRegisterMutation,
    useDeleteUserMutation,
} from '../slices/userApiSlice';

import { useUpdateUserRolesMutation } from '../slices/userApiSlice';

const AdminUsersScreen = () => {
    const { data: users = [], isLoading, error, refetch } = useGetUsersQuery();

    const [registerUser, { isLoading: isRegistering }] =
        useRegisterMutation();

    const [deleteUser] = useDeleteUserMutation();

    const [updateUserRoles] = useUpdateUserRolesMutation();

    // PRETRAGA
    const [search, setSearch] = useState('');

    // FILTER
    const [filter, setFilter] = useState('Svi');

    // KORISNIK ZA PREGLED
    const [selectedUser, setSelectedUser] = useState(null);

    // KORISNIK ZA IZMENU
    const [editingUser, setEditingUser] = useState(null);

    // MODAL ZA DODAVANJE
    const [showAddModal, setShowAddModal] = useState(false);

    // MODAL ZA PREGLED
    const [showViewModal, setShowViewModal] = useState(false);

    // MODAL ZA IZMENU
    const [showEditModal, setShowEditModal] = useState(false);

    // PODACI ZA NOVOG KORISNIKA
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'guest',
    });

    // PODACI ZA IZMENU ULOGE
    const [editRole, setEditRole] = useState('guest');

    // -----------------------------------------
    // ODREĐIVANJE ULOGE
    // -----------------------------------------

    const getUserRole = (user) => {
        if (user.isAdmin) return 'Administrator';
        if (user.isManager) return 'Menadžer';
        if (user.isWaiter) return 'Konobar';
        if (user.isLoyalCustomer) return 'Stalni gost';

        return 'Gost';
    };

    const getRoleBadge = (user) => {
        if (user.isAdmin) {
            return <Badge bg="dark">👑 Administrator</Badge>;
        }

        if (user.isManager) {
            return <Badge bg="secondary">💼 Menadžer</Badge>;
        }

        if (user.isWaiter) {
            return <Badge bg="warning" text="dark">🍽️ Konobar</Badge>;
        }

        if (user.isLoyalCustomer) {
            return <Badge bg="success">⭐ Stalni gost</Badge>;
        }

        return <Badge bg="light" text="dark">👤 Gost</Badge>;
    };

    // -----------------------------------------
    // FILTER + PRETRAGA
    // -----------------------------------------

    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            user.name?.toLowerCase().includes(searchText) ||
            user.email?.toLowerCase().includes(searchText);

        let matchesFilter = true;

        if (filter === 'Admin') {
            matchesFilter = user.isAdmin;
        }

        if (filter === 'Manager') {
            matchesFilter = user.isManager;
        }

        if (filter === 'Waiter') {
            matchesFilter = user.isWaiter;
        }

        if (filter === 'Loyal') {
            matchesFilter = user.isLoyalCustomer;
        }

        if (filter === 'Guest') {
            matchesFilter =
                !user.isAdmin &&
                !user.isManager &&
                !user.isWaiter &&
                !user.isLoyalCustomer;
        }

        return matchesSearch && matchesFilter;
    });

    // -----------------------------------------
    // DODAVANJE KORISNIKA
    // -----------------------------------------

    const addUserHandler = async (e) => {
        e.preventDefault();

        try {
            const data = {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                phone: newUser.phone,
                address: newUser.address,

                isAdmin: newUser.role === 'admin',
                isManager: newUser.role === 'manager',
                isWaiter: newUser.role === 'waiter',
                isLoyalCustomer: newUser.role === 'loyal',
            };

            await registerUser(data).unwrap();

            alert('Korisnik je uspešno dodat!');

            setNewUser({
                name: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                role: 'guest',
            });

            setShowAddModal(false);
            refetch();
        } catch (error) {
            alert(
                error?.data?.message ||
                'Greška prilikom dodavanja korisnika.'
            );
        }
    };

    // -----------------------------------------
    // BRISANJE
    // -----------------------------------------

    const deleteHandler = async (userId) => {
        const confirmed = window.confirm(
            'Da li ste sigurni da želite da obrišete ovog korisnika?'
        );

        if (!confirmed) return;

        try {
            await deleteUser(userId).unwrap();

            alert('Korisnik je uspešno obrisan.');

            refetch();
        } catch (error) {
            alert(
                error?.data?.message ||
                'Greška prilikom brisanja korisnika.'
            );
        }
    };

    // -----------------------------------------
    // OTVARANJE PROFILA
    // -----------------------------------------

    const viewHandler = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    // -----------------------------------------
    // OTVARANJE IZMENE ULOGE
    // -----------------------------------------

    const editHandler = (user) => {
        setEditingUser(user);

        if (user.isAdmin) {
            setEditRole('admin');
        } else if (user.isManager) {
            setEditRole('manager');
        } else if (user.isWaiter) {
            setEditRole('waiter');
        } else if (user.isLoyalCustomer) {
            setEditRole('loyal');
        } else {
            setEditRole('guest');
        }

        setShowEditModal(true);
    };

    // -----------------------------------------
    // ČUVANJE IZMENE ULOGE
    // -----------------------------------------

    const saveRoleHandler = async () => {
        try {
            await updateUserRoles({
                userId: editingUser._id,
                roleData: {
                    isAdmin: editRole === 'admin',
                    isManager: editRole === 'manager',
                    isWaiter: editRole === 'waiter',
                    isLoyalCustomer: editRole === 'loyal',
                },
            }).unwrap();

            alert('Uloga korisnika je uspešno promenjena.');

            setShowEditModal(false);
            setEditingUser(null);

            refetch();
        } catch (error) {
            alert(
                error?.data?.message ||
                'Greška prilikom izmene uloge.'
            );
        }
    };

    // -----------------------------------------
    // LOADING
    // -----------------------------------------

    if (isLoading) {
        return (
            <Container className="text-center py-5">
                <h3>Učitavanje korisnika...</h3>
            </Container>
        );
    }

    // -----------------------------------------
    // ERROR
    // -----------------------------------------

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    Greška prilikom učitavanja korisnika.
                </Alert>
            </Container>
        );
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                borderRadius: '40px',
                background:
                    'linear-gradient(135deg, #958b90 0%, #d5c2bc 100%)',
                padding: '40px 20px 80px',
            }}
        >
            <Container>

                {/* NASLOV */}
                <div className="text-center mb-4">

                    <h1
                        style={{
                            color: '#4b2e2e',
                            fontWeight: 'bold',
                            fontFamily: 'initial',
                        }}
                    >
                        👥 KORISNICI
                    </h1>

                    <p style={{ color: '#2b2525' }}>
                        Upravljanje korisničkim nalozima Heramatik aplikacije.
                    </p>

                </div>

                {/* STATISTIKA */}
                <Row className="g-4 mb-4">

                    <Col md={3}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                background: '#fff7fb',
                                boxShadow:
                                    '0 8px 20px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Body className="text-center">
                                <FaUsers size={35} color="#4b2e2e" />

                                <h5 className="mt-2">
                                    Ukupno
                                </h5>

                                <h2
                                    style={{
                                        color: '#441212',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {users.length}
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                background: '#fff7fb',
                                boxShadow:
                                    '0 8px 20px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Body className="text-center">
                                <div style={{ fontSize: '2rem' }}>
                                    👑
                                </div>

                                <h5>Administratori</h5>

                                <h2
                                    style={{
                                        color: '#441212',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {
                                        users.filter(
                                            (user) => user.isAdmin
                                        ).length
                                    }
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                background: '#fff7fb',
                                boxShadow:
                                    '0 8px 20px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Body className="text-center">
                                <div style={{ fontSize: '2rem' }}>
                                    🍽️
                                </div>

                                <h5>Konobari</h5>

                                <h2
                                    style={{
                                        color: '#441212',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {
                                        users.filter(
                                            (user) => user.isWaiter
                                        ).length
                                    }
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card
                            style={{
                                border: 'none',
                                borderRadius: '25px',
                                background: '#fff7fb',
                                boxShadow:
                                    '0 8px 20px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Card.Body className="text-center">
                                <div style={{ fontSize: '2rem' }}>
                                    ⭐
                                </div>

                                <h5>Stalni gosti</h5>

                                <h2
                                    style={{
                                        color: '#441212',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {
                                        users.filter(
                                            (user) =>
                                                user.isLoyalCustomer
                                        ).length
                                    }
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                {/* PRETRAGA + FILTER + DODAJ */}
                <Card
                    style={{
                        border: 'none',
                        borderRadius: '25px',
                        background: 'rgba(255,255,255,0.45)',
                        backdropFilter: 'blur(10px)',
                        boxShadow:
                            '0 8px 20px rgba(0,0,0,0.12)',
                    }}
                    className="mb-4"
                >
                    <Card.Body>

                        <Row className="g-3 align-items-center">

                            <Col md={5}>
                                <div className="d-flex align-items-center">

                                    <FaSearch
                                        color="#4b2e2e"
                                        className="me-2"
                                    />

                                    <Form.Control
                                        type="text"
                                        placeholder="Pretraži po imenu ili emailu..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        style={{
                                            borderRadius: '15px',
                                            border: 'none',
                                        }}
                                    />

                                </div>
                            </Col>

                            <Col md={4}>
                                <Form.Select
                                    value={filter}
                                    onChange={(e) =>
                                        setFilter(e.target.value)
                                    }
                                    style={{
                                        borderRadius: '15px',
                                        border: 'none',
                                    }}
                                >
                                    <option value="Svi">
                                        👥 Svi korisnici
                                    </option>

                                    <option value="Admin">
                                        👑 Administratori
                                    </option>

                                    <option value="Manager">
                                        💼 Menadžeri
                                    </option>

                                    <option value="Waiter">
                                        🍽️ Konobari
                                    </option>

                                    <option value="Loyal">
                                        ⭐ Stalni gosti
                                    </option>

                                    <option value="Guest">
                                        👤 Gosti
                                    </option>
                                </Form.Select>
                            </Col>

                            <Col md={3}>
                                <Button
                                    className="w-100"
                                    onClick={() =>
                                        setShowAddModal(true)
                                    }
                                    style={{
                                        backgroundColor: '#441212',
                                        border: 'none',
                                        borderRadius: '15px',
                                        padding: '11px',
                                        fontWeight: '600',
                                    }}
                                >
                                    <FaUserPlus className="me-2" />
                                    Dodaj korisnika
                                </Button>
                            </Col>

                        </Row>

                    </Card.Body>
                </Card>

                {/* TABELA */}
                <Card
                    style={{
                        border: 'none',
                        borderRadius: '30px',
                        background: '#fff7fb',
                        boxShadow:
                            '0 8px 20px rgba(0,0,0,0.12)',
                        overflow: 'hidden',
                    }}
                >
                    <Card.Body className="p-0">

                        <div className="table-responsive">

                            <Table
                                hover
                                className="mb-0 align-middle"
                            >

                                <thead
                                    style={{
                                        backgroundColor: '#4b2e2e',
                                        color: 'white',
                                    }}
                                >
                                    <tr>
                                        <th className="p-3">
                                            Korisnik
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Telefon
                                        </th>

                                        <th>
                                            Uloga
                                        </th>

                                        <th className="text-center">
                                            Akcije
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredUsers.map((user) => (

                                        <tr key={user._id}>

                                            <td className="p-3">
                                                <strong>
                                                    {user.name}
                                                </strong>
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                {user.phone || '—'}
                                            </td>

                                            <td>
                                                {getRoleBadge(user)}
                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2">

                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            viewHandler(user)
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                '#4b2e2e',
                                                            border: 'none',
                                                            borderRadius:
                                                                '10px',
                                                        }}
                                                    >
                                                        <FaEye />
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            editHandler(user)
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                '#958b90',
                                                            border: 'none',
                                                            borderRadius:
                                                                '10px',
                                                        }}
                                                    >
                                                        <FaUserEdit />
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() =>
                                                            deleteHandler(
                                                                user._id
                                                            )
                                                        }
                                                        style={{
                                                            border: 'none',
                                                            borderRadius:
                                                                '10px',
                                                        }}
                                                    >
                                                        <FaTrash />
                                                    </Button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </Table>

                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="text-center p-5">
                                <h5>Nema korisnika koji odgovaraju pretrazi.</h5>
                            </div>
                        )}

                    </Card.Body>
                </Card>

            </Container>

            {/* ================================= */}
            {/* MODAL - DODAVANJE KORISNIKA */}
            {/* ================================= */}

            <Modal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                centered
            >
                <Modal.Header
                    closeButton
                    style={{
                        backgroundColor: '#4b2e2e',
                        color: 'white',
                    }}
                >
                    <Modal.Title>
                        👤 Dodaj novog korisnika
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={addUserHandler}>

                        <Form.Group className="mb-3">
                            <Form.Label>Ime i prezime</Form.Label>

                            <Form.Control
                                required
                                value={newUser.name}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                required
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Lozinka</Form.Label>

                            <Form.Control
                                type="password"
                                required
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Telefon</Form.Label>

                            <Form.Control
                                value={newUser.phone}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Adresa</Form.Label>

                            <Form.Control
                                value={newUser.address}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Uloga</Form.Label>

                            <Form.Select
                                value={newUser.role}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        role: e.target.value,
                                    })
                                }
                            >
                                <option value="guest">
                                    👤 Gost
                                </option>

                                <option value="waiter">
                                    🍽️ Konobar
                                </option>

                                <option value="manager">
                                    💼 Menadžer
                                </option>

                                <option value="admin">
                                    👑 Administrator
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                            disabled={isRegistering}
                            style={{
                                backgroundColor: '#441212',
                                border: 'none',
                                borderRadius: '15px',
                                padding: '12px',
                            }}
                        >
                            {isRegistering
                                ? 'Dodavanje...'
                                : '➕ Dodaj korisnika'}
                        </Button>

                    </Form>

                </Modal.Body>
            </Modal>

            {/* ================================= */}
            {/* MODAL - PREGLED PROFILA */}
            {/* ================================= */}

            <Modal
                show={showViewModal}
                onHide={() => setShowViewModal(false)}
                centered
            >
                <Modal.Header
                    closeButton
                    style={{
                        backgroundColor: '#4b2e2e',
                        color: 'white',
                    }}
                >
                    <Modal.Title>
                        👤 Profil korisnika
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {selectedUser && (

                        <div>

                            <div className="text-center mb-4">

                                <div
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        backgroundColor: '#d5c2bc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto',
                                        fontSize: '2rem',
                                    }}
                                >
                                    👤
                                </div>

                                <h3 className="mt-3">
                                    {selectedUser.name}
                                </h3>

                                {getRoleBadge(selectedUser)}

                            </div>

                            <Card
                                style={{
                                    border: 'none',
                                    backgroundColor: '#fff7fb',
                                    borderRadius: '20px',
                                }}
                            >
                                <Card.Body>

                                    <p>
                                        <strong>📧 Email:</strong>{' '}
                                        {selectedUser.email}
                                    </p>

                                    <p>
                                        <strong>📞 Telefon:</strong>{' '}
                                        {selectedUser.phone || 'Nije unet'}
                                    </p>

                                    <p>
                                        <strong>🏠 Adresa:</strong>{' '}
                                        {selectedUser.address || 'Nije uneta'}
                                    </p>

                                    <p>
                                        <strong>🎭 Uloga:</strong>{' '}
                                        {getUserRole(selectedUser)}
                                    </p>

                                    <p className="mb-0">
                                        <strong>⭐ Stalni gost:</strong>{' '}
                                        {selectedUser.isLoyalCustomer
                                            ? 'Da — 15% popusta'
                                            : 'Ne'}
                                    </p>

                                </Card.Body>
                            </Card>

                        </div>

                    )}

                </Modal.Body>
            </Modal>

            {/* ================================= */}
            {/* MODAL - IZMENA ULOGE */}
            {/* ================================= */}

            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                centered
            >
                <Modal.Header
                    closeButton
                    style={{
                        backgroundColor: '#4b2e2e',
                        color: 'white',
                    }}
                >
                    <Modal.Title>
                        🎭 Izmena uloge
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {editingUser && (

                        <>
                            <p>
                                Korisnik:{' '}
                                <strong>
                                    {editingUser.name}
                                </strong>
                            </p>

                            <Form.Group className="mb-4">

                                <Form.Label>
                                    Nova uloga
                                </Form.Label>

                                <Form.Select
                                    value={editRole}
                                    onChange={(e) =>
                                        setEditRole(e.target.value)
                                    }
                                >
                                    <option value="guest">
                                        👤 Gost
                                    </option>

                                    <option value="waiter">
                                        🍽️ Konobar
                                    </option>

                                    <option value="manager">
                                        💼 Menadžer
                                    </option>

                                    <option value="admin">
                                        👑 Administrator
                                    </option>

                                    <option value="loyal">
                                        ⭐ Stalni gost
                                    </option>
                                </Form.Select>

                            </Form.Group>

                            <Button
                                className="w-100"
                                onClick={saveRoleHandler}
                                style={{
                                    backgroundColor: '#441212',
                                    border: 'none',
                                    borderRadius: '15px',
                                    padding: '12px',
                                }}
                            >
                                💾 Sačuvaj izmene
                            </Button>
                        </>

                    )}

                </Modal.Body>
            </Modal>

        </div>
    );
};

export default AdminUsersScreen;
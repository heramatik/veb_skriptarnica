import React, { useState } from 'react';
import {
    Card,
    Table,
    Badge,
    Button,
    Modal,
    Row,
    Col,
    Form,
    Spinner,
    Alert,
} from 'react-bootstrap';

import {
    useGetAllOrdersQuery,
    useMarkOrderAsPaidMutation,
} from '../slices/orderApiSlice';

const AdminOrdersScreen = () => {
    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useGetAllOrdersQuery();

    const [markOrderAsPaid] = useMarkOrderAsPaidMutation();

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('sve');

    // FILTRIRANJE
    const filteredOrders = orders.filter((order) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            order._id?.toLowerCase().includes(searchText) ||
            order.user?.name?.toLowerCase().includes(searchText) ||
            order.user?.email?.toLowerCase().includes(searchText);

        const matchesFilter =
            filter === 'sve' ||
            (filter === 'placene' && order.isPaid) ||
            (filter === 'neplacene' && !order.isPaid);

        return matchesSearch && matchesFilter;
    });

    // STATISTIKA
    const totalOrders = orders.length;

    const paidOrders = orders.filter(
        (order) => order.isPaid
    ).length;

    const unpaidOrders = orders.filter(
        (order) => !order.isPaid
    ).length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + Number(order.totalPrice || 0),
        0
    );

    // POTVRDA PLAĆANJA
    const handleMarkAsPaid = async (orderId) => {
        try {
            await markOrderAsPaid(orderId).unwrap();

            if (selectedOrder) {
                setSelectedOrder({
                    ...selectedOrder,
                    isPaid: true,
                    paidAt: new Date().toISOString(),
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-3">
                    Učitavanje porudžbina...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <Alert variant="danger">
                Greška pri učitavanju porudžbina:{' '}
                {error?.data?.message || 'Nepoznata greška'}
            </Alert>
        );
    }

    return (
        <div
            style={{
                background:
                    'linear-gradient(135deg, #958b90 0%, #d5c2bc 100%)',
                minHeight: '80vh',
                padding: '30px',
                borderRadius: '25px',
            }}
        >
            {/* NASLOV */}
            <div className="text-center mb-4">
                <h1
                    style={{
                        color: '#4b2e2e',
                        fontWeight: '700',
                    }}
                >
                    🛍️ Upravljanje porudžbinama
                </h1>

                <p style={{ color: '#3d2922' }}>
                    Pregled i upravljanje svim porudžbinama korisnika.
                </p>
            </div>

            {/* STATISTIKA */}
            <Row className="g-3 mb-4">

                <Col md={3}>
                    <Card
                        className="h-100 text-center border-0"
                        style={{
                            borderRadius: '20px',
                            backgroundColor: '#fff7fb',
                        }}
                    >
                        <Card.Body>
                            <h6>📦 Ukupno porudžbina</h6>

                            <h2
                                style={{
                                    color: '#4b2e2e',
                                    fontWeight: '700',
                                }}
                            >
                                {totalOrders}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card
                        className="h-100 text-center border-0"
                        style={{
                            borderRadius: '20px',
                            backgroundColor: '#fff7fb',
                        }}
                    >
                        <Card.Body>
                            <h6>💳 Plaćene</h6>

                            <h2
                                style={{
                                    color: '#4b2e2e',
                                    fontWeight: '700',
                                }}
                            >
                                {paidOrders}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card
                        className="h-100 text-center border-0"
                        style={{
                            borderRadius: '20px',
                            backgroundColor: '#fff7fb',
                        }}
                    >
                        <Card.Body>
                            <h6>⏳ Neplaćene</h6>

                            <h2
                                style={{
                                    color: '#4b2e2e',
                                    fontWeight: '700',
                                }}
                            >
                                {unpaidOrders}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card
                        className="h-100 text-center border-0"
                        style={{
                            borderRadius: '20px',
                            backgroundColor: '#fff7fb',
                        }}
                    >
                        <Card.Body>
                            <h6>💰 Ukupan prihod</h6>

                            <h2
                                style={{
                                    color: '#4b2e2e',
                                    fontWeight: '700',
                                }}
                            >
                                {totalRevenue.toFixed(2)} RSD
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            {/* PRETRAGA I FILTER */}
            <Card
                className="border-0 mb-4"
                style={{
                    borderRadius: '20px',
                    backgroundColor: '#fff7fb',
                }}
            >
                <Card.Body>
                    <Row className="g-3">

                        <Col md={8}>
                            <Form.Control
                                type="text"
                                placeholder="🔍 Pretraži po ID-u, imenu ili emailu..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                style={{
                                    borderRadius: '12px',
                                    padding: '12px',
                                }}
                            />
                        </Col>

                        <Col md={4}>
                            <Form.Select
                                value={filter}
                                onChange={(e) =>
                                    setFilter(e.target.value)
                                }
                                style={{
                                    borderRadius: '12px',
                                    padding: '12px',
                                }}
                            >
                                <option value="sve">
                                    Sve porudžbine
                                </option>

                                <option value="placene">
                                    Samo plaćene
                                </option>

                                <option value="neplacene">
                                    Samo neplaćene
                                </option>
                            </Form.Select>
                        </Col>

                    </Row>
                </Card.Body>
            </Card>

            {/* TABELA */}
            <Card
                className="border-0"
                style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                }}
            >
                <Card.Body>

                    <div className="table-responsive">

                        <Table
                            hover
                            responsive
                            className="align-middle mb-0"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Korisnik</th>
                                    <th>Datum</th>
                                    <th>Plaćanje</th>
                                    <th>Artikli</th>
                                    <th>Ukupno</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center py-4"
                                        >
                                            Nema porudžbina koje odgovaraju
                                            pretrazi.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (

                                        <tr key={order._id}>

                                            <td>
                                                <small>
                                                    {order._id.slice(-8)}
                                                </small>
                                            </td>

                                            <td>
                                                <strong>
                                                    {order.user?.name ||
                                                        'Nepoznat korisnik'}
                                                </strong>

                                                <br />

                                                <small className="text-muted">
                                                    {order.user?.email || ''}
                                                </small>
                                            </td>

                                            <td>
                                                {order.createdAt
                                                    ? new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString(
                                                        'sr-RS'
                                                    )
                                                    : '-'}
                                            </td>

                                            <td>
                                                {order.paymentMethod}
                                            </td>

                                            <td>
                                                {order.orderItems?.reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        Number(
                                                            item.qty || 0
                                                        ),
                                                    0
                                                )}
                                            </td>

                                            <td>
                                                <strong>
                                                    {Number(
                                                        order.totalPrice || 0
                                                    ).toFixed(2)}{' '}
                                                    RSD
                                                </strong>
                                            </td>

                                            <td>
                                                {order.isPaid ? (
                                                    <Badge bg="success">
                                                        Plaćeno
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="warning">
                                                        Čeka plaćanje
                                                    </Badge>
                                                )}
                                            </td>

                                            <td>
                                                <Button
                                                    size="sm"
                                                    style={{
                                                        backgroundColor:
                                                            '#441212',
                                                        border: 'none',
                                                        borderRadius: '10px',
                                                    }}
                                                    onClick={() =>
                                                        setSelectedOrder(
                                                            order
                                                        )
                                                    }
                                                >
                                                    Detalji
                                                </Button>
                                            </td>

                                        </tr>

                                    ))
                                )}

                            </tbody>
                        </Table>

                    </div>

                </Card.Body>
            </Card>

            {/* MODAL ZA DETALJE */}
            <Modal
                show={!!selectedOrder}
                onHide={() => setSelectedOrder(null)}
                centered
                size="lg"
            >
                {selectedOrder && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                🧾 Detalji porudžbine
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Row className="mb-4">

                                <Col md={6}>
                                    <h6>Korisnik</h6>

                                    <p className="mb-1">
                                        <strong>
                                            {selectedOrder.user?.name ||
                                                'Nepoznat korisnik'}
                                        </strong>
                                    </p>

                                    <p className="mb-1">
                                        {selectedOrder.user?.email}
                                    </p>

                                    <p>
                                        {selectedOrder.user?.phone}
                                    </p>
                                </Col>

                                <Col md={6}>
                                    <h6>Porudžbina</h6>

                                    <p className="mb-1">
                                        ID:{' '}
                                        <small>
                                            {selectedOrder._id}
                                        </small>
                                    </p>

                                    <p className="mb-1">
                                        Način plaćanja:{' '}
                                        <strong>
                                            {selectedOrder.paymentMethod}
                                        </strong>
                                    </p>

                                    <p>
                                        Status:{' '}
                                        {selectedOrder.isPaid ? (
                                            <Badge bg="success">
                                                Plaćeno
                                            </Badge>
                                        ) : (
                                            <Badge bg="warning">
                                                Čeka plaćanje
                                            </Badge>
                                        )}
                                    </p>
                                </Col>

                            </Row>

                            <h5 className="mb-3">
                                🛒 Artikli
                            </h5>

                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Artikal</th>
                                        <th>Cena</th>
                                        <th>Količina</th>
                                        <th>Ukupno</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {selectedOrder.orderItems?.map(
                                        (item, index) => (
                                            <tr key={index}>

                                                <td>
                                                    {item.name}
                                                </td>

                                                <td>
                                                    {Number(
                                                        item.price || 0
                                                    ).toFixed(2)}{' '}
                                                    RSD
                                                </td>

                                                <td>
                                                    {item.qty}
                                                </td>

                                                <td>
                                                    {(
                                                        Number(
                                                            item.price || 0
                                                        ) *
                                                        Number(
                                                            item.qty || 0
                                                        )
                                                    ).toFixed(2)}{' '}
                                                    RSD
                                                </td>

                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>

                            <div className="text-end">

                                <p>
                                    Cena artikala:{' '}
                                    <strong>
                                        {Number(
                                            selectedOrder.itemsPrice || 0
                                        ).toFixed(2)}{' '}
                                        RSD
                                    </strong>
                                </p>

                                <p>
                                    Popust:{' '}
                                    <strong>
                                        {selectedOrder.discountPercentage || 0}
                                        %
                                    </strong>
                                </p>

                                <p>
                                    Iznos popusta:{' '}
                                    <strong>
                                        {Number(
                                            selectedOrder.discountAmount || 0
                                        ).toFixed(2)}{' '}
                                        RSD
                                    </strong>
                                </p>

                                <h4
                                    style={{
                                        color: '#4b2e2e',
                                    }}
                                >
                                    Ukupno:{' '}
                                    {Number(
                                        selectedOrder.totalPrice || 0
                                    ).toFixed(2)}{' '}
                                    RSD
                                </h4>

                            </div>

                        </Modal.Body>

                        <Modal.Footer>

                            {!selectedOrder.isPaid && (
                                <Button
                                    variant="success"
                                    onClick={() =>
                                        handleMarkAsPaid(
                                            selectedOrder._id
                                        )
                                    }
                                >
                                    ✅ Potvrdi plaćanje
                                </Button>
                            )}

                            <Button
                                variant="secondary"
                                onClick={() =>
                                    setSelectedOrder(null)
                                }
                            >
                                Zatvori
                            </Button>

                        </Modal.Footer>
                    </>
                )}
            </Modal>

        </div>
    );
};

export default AdminOrdersScreen;
import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    Form,
    Badge,
    Modal,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} from "../slices/productsApiSlice";

const AdminProductsScreen = () => {
    const { data: products = [], isLoading, error } = useGetProductsQuery();

    const [createProduct, { isLoading: creating }] =
        useCreateProductMutation();

    const [updateProduct, { isLoading: updating }] =
        useUpdateProductMutation();

    const [deleteProduct] = useDeleteProductMutation();

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        countInStock: "",
        isAvailable: true,
    });

    // OTVARANJE FORME ZA NOVI PROIZVOD
    const handleAddProduct = () => {
        setEditingProduct(null);

        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
            countInStock: "",
            isAvailable: true,
        });

        setShowModal(true);
    };

    // OTVARANJE FORME ZA IZMENU
    const handleEditProduct = (product) => {
        setEditingProduct(product);

        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image || "",
            countInStock: product.countInStock,
            isAvailable: product.isAvailable,
        });

        setShowModal(true);
    };

    // PROMENA POLJA U FORMI
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // ČUVANJE PROIZVODA
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                countInStock: Number(formData.countInStock),
                isAvailable:
                    Number(formData.countInStock) > 0 &&
                    formData.isAvailable,
            };

            if (editingProduct) {
                await updateProduct({
                    productId: editingProduct._id,
                    product: productData,
                }).unwrap();

                toast.success("Proizvod je uspešno izmenjen!");
            } else {
                await createProduct(productData).unwrap();

                toast.success("Proizvod je uspešno dodat!");
            }

            setShowModal(false);
        } catch (err) {
            toast.error(
                err?.data?.message || "Došlo je do greške."
            );
        }
    };

    // BRISANJE PROIZVODA
    const handleDelete = async (productId) => {
        if (
            window.confirm(
                "Da li ste sigurni da želite da obrišete ovaj proizvod?"
            )
        ) {
            try {
                await deleteProduct(productId).unwrap();

                toast.success("Proizvod je obrisan!");
            } catch (err) {
                toast.error(
                    err?.data?.message || "Proizvod nije moguće obrisati."
                );
            }
        }
    };

    // FILTER
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container className="py-4">

            {/* NASLOV */}
            <Row className="align-items-center mb-4">
                <Col>
                    <h1 className="mb-1">Upravljanje proizvodima</h1>
                    <p className="text-muted">
                        Dodavanje, izmena i brisanje proizvoda
                    </p>
                </Col>

                <Col xs="auto">
                    <Button
                        variant="dark"
                        onClick={handleAddProduct}
                    >
                        <FaPlus className="me-2" />
                        Dodaj proizvod
                    </Button>
                </Col>
            </Row>

            {/* PRETRAGA */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Form.Control
                        type="text"
                        placeholder="Pretraži proizvode..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Card.Body>
            </Card>

            {/* PROIZVODI */}
            <Card className="shadow-sm">

                <Card.Body>

                    {isLoading ? (
                        <p>Učitavanje proizvoda...</p>
                    ) : error ? (
                        <p className="text-danger">
                            Greška pri učitavanju proizvoda.
                        </p>
                    ) : filteredProducts.length === 0 ? (
                        <p className="text-center text-muted">
                            Nema proizvoda.
                        </p>
                    ) : (

                        <Table responsive hover className="align-middle">

                            <thead>
                                <tr>
                                    <th>Proizvod</th>
                                    <th>Kategorija</th>
                                    <th>Cena</th>
                                    <th>Količina</th>
                                    <th>Status</th>
                                    <th className="text-end">
                                        Akcije
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredProducts.map((product) => (

                                    <tr key={product._id}>

                                        <td>
                                            <strong>
                                                {product.name}
                                            </strong>
                                        </td>

                                        <td>
                                            {product.category}
                                        </td>

                                        <td>
                                            {product.price} RSD
                                        </td>

                                        <td>
                                            {product.countInStock}
                                        </td>

                                        <td>

                                            {product.isAvailable &&
                                                product.countInStock > 0 ? (
                                                <Badge bg="success">
                                                    Na stanju
                                                </Badge>
                                            ) : (
                                                <Badge bg="danger">
                                                    Nije na stanju
                                                </Badge>
                                            )}

                                        </td>

                                        <td className="text-end">

                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() =>
                                                    handleEditProduct(product)
                                                }
                                            >
                                                <FaEdit />
                                            </Button>

                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(
                                                        product._id
                                                    )
                                                }
                                            >
                                                <FaTrash />
                                            </Button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </Table>

                    )}

                </Card.Body>

            </Card>

            {/* MODAL ZA DODAVANJE / IZMENU */}

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        {editingProduct
                            ? "Izmena proizvoda"
                            : "Dodavanje proizvoda"}
                    </Modal.Title>

                </Modal.Header>

                <Form onSubmit={handleSubmit}>

                    <Modal.Body>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Naziv proizvoda
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Opis
                            </Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />

                        </Form.Group>

                        <Row>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Cena (RSD)
                                    </Form.Label>

                                    <Form.Control
                                        type="number"
                                        min="0"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Količina
                                    </Form.Label>

                                    <Form.Control
                                        type="number"
                                        min="0"
                                        name="countInStock"
                                        value={formData.countInStock}
                                        onChange={handleChange}
                                        required
                                    />

                                </Form.Group>

                            </Col>

                        </Row>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Kategorija
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="category"
                                placeholder="npr. Kafa, Sokovi, Hrana..."
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Slika proizvoda
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="image"
                                placeholder="URL slike"
                                value={formData.image}
                                onChange={handleChange}
                            />

                        </Form.Group>

                        <Form.Check
                            type="switch"
                            name="isAvailable"
                            label="Proizvod je trenutno na stanju"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                            disabled={
                                Number(formData.countInStock) === 0
                            }
                        />

                    </Modal.Body>

                    <Modal.Footer>

                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Otkaži
                        </Button>

                        <Button
                            variant="dark"
                            type="submit"
                            disabled={creating || updating}
                        >
                            {creating || updating
                                ? "Čuvanje..."
                                : "Sačuvaj"}
                        </Button>

                    </Modal.Footer>

                </Form>

            </Modal>

        </Container>
    );
};

export default AdminProductsScreen;

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap' // Dodati Row i Col ovde

const Footer = () => {
    // Ova linija koda uzima trenutnu godinu (npr. 2026)
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p>&copy; {currentYear} Hospinia Web Game. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
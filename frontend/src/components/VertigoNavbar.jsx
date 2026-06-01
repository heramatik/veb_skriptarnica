import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const VertigoNavbar = () => {
    return (
        <Nav
            className="justify-content-center py-3 mb-4 gap-3"
            style={{
                backgroundColor: '#f8d7da',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
        >
            <LinkContainer to="/vertigo">
                <Nav.Link
                    style={{
                        color: '#4b2e2e',
                        fontWeight: '600',
                    }}
                >☕ O nama</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/vertigo/menu">
                <Nav.Link
                    style={{
                        color: '#4b2e2e',
                        fontWeight: '600',
                    }}
                >📖 Glavni meni</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/vertigo/cedjeno">
                <Nav.Link
                    style={{
                        color: '#4b2e2e',
                        fontWeight: '600',
                    }}
                >🍊 Ceđeno voće</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/vertigo/vina">
                <Nav.Link
                    style={{
                        color: '#4b2e2e',
                        fontWeight: '600',
                    }}
                >🍷 Vinska karta</Nav.Link>
            </LinkContainer>
        </Nav>
    );
};

export default VertigoNavbar;
import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (

      <header>                                             
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                    <img src={logo} alt="Hospinia" width="30" height="30" className="d-inline-block align-top me-2" />
                    <span className="fw-bold">Skriptarnica</span>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse id ="basic-navbar-nav">
                    <Nav className='ms-auto'>
                    <LinkContainer to="/cart">
                    <Nav.Link>
                        <FaShoppingCart /> Cosmetics
                    </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                    <Nav.Link>
                        <FaUser/> Login
                    </Nav.Link>
                    </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
            </Container>
            </Navbar>
      </header>
    )
}
export default Header
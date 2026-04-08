import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'
const Header = () => {
    return (

      <header>                                             
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href = "/">
                <img src={logo} alt="Hospinia" width="30" height="30" className="d-inline-block align-top me-2" />
                <span className="fw-bold">Hospinia web game</span>
                </Navbar.Brand>
                <Navbar.Collapse id ="basic-navbar-nav">
                    <Nav className='ms-auto'>
                    <Nav.Link href="/cart">
                        <FaShoppingCart /> Cosmetics
                    </Nav.Link>
                    <Nav.Link href="/login">
                        <FaUser/> Login
                    </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
            </Container>
            </Navbar>
      </header>
    )
}
export default Header
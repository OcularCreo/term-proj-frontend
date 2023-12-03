import logo from '../images/BelowCarbs_Icon-01.png';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const navigationBar = () => {
    return(
        <>
            <Navbar bg='light' variant='light' expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={logo} alt="Logo" width="75" height="75"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to='/search'>
                            <Nav.Link>Search</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/library'>
                            <Nav.Link>Library</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default navigationBar;
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = () => {
  const { starLogout, user } = useAuthStore();
  return (
    <Navbar bg="dark" variant="dark" className="mb-4 px-4">
      <Container>
        <Navbar.Brand>
          <i className="fa-regular fa-calendar"></i>
          &nbsp; <b>{user.name}</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Button variant="outline-danger" onClick={starLogout}>
              <i className="fas fa-sign-out-alt"></i>
              &nbsp; Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

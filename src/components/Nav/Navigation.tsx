import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useGetProfileQuery } from "../../services/api";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useAppDispatch } from "../../store";
import { logOut } from "../../services/authSlice";

function Navigation({ token }: { token: string | null }) {
  const dispatch = useAppDispatch();

  const { data: user, isLoading } = useGetProfileQuery(token, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <NavLink className="text-reset text-decoration-none" to="/">
            BOOKS
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">
              {isLoading ? <Spinner size="sm" /> : user?.email}
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button
          variant="outline-dark"
          onClick={() => {
            dispatch(logOut());
          }}
        >
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
}

export default Navigation;

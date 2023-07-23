import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useGetProfileQuery } from "../../services/api";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../store";
import { logOut, setProfile } from "../../services/authSlice";
import { useEffect } from "react";

function Navigation({ token }: { token?: string | null }) {
  const dispatch = useAppDispatch();
  const { accessToken, profile } = useAppSelector((state) => state.auth);

  const { data: user } = useGetProfileQuery(token, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    dispatch(setProfile(user));
  }, [user, dispatch]);

  const AuthButton = () => {
    if (accessToken) {
      return (
        <Button
          variant="outline-dark"
          onClick={() => {
            dispatch(logOut());
          }}
        >
          Log Out
        </Button>
      );
    }
  };

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
            <Nav.Link href="#link">{profile?.email}</Nav.Link>
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
          {AuthButton()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

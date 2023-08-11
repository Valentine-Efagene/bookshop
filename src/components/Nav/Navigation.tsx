import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useGetProfileQuery } from "../../services/api";
import { persistor, useAppDispatch, useAppSelector } from "../../store";
import { logOut, setProfile } from "../../services/authSlice";
import { useEffect } from "react";
import { IAPIError } from "../../types";

function Navigation({ token }: { token?: string | null }) {
  const dispatch = useAppDispatch();
  const { accessToken, profile } = useAppSelector((state) => state.auth);

  const { data: user, error } = useGetProfileQuery(token, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    if ((error as IAPIError)?.data?.message.includes("expired")) {
      persistor.purge();
    }
  }, [error]);

  const getName = () => {
    if (profile?.firstName && profile.lastName) {
      return `${profile?.firstName?.[0]} ${profile?.lastName?.[0]}`;
    }

    if (profile?.firstName) {
      return profile?.firstName?.[0];
    }

    return profile?.email;
  };

  useEffect(() => {
    dispatch(setProfile(user));
  }, [user, dispatch]);

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
            <Nav.Link>
              <NavLink to="/">Home</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/cart">Cart</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/orders">Orders</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/books/add">Add Book</NavLink>
            </Nav.Link>
          </Nav>
          {accessToken ? (
            <NavDropdown title={getName()} id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  dispatch(logOut());
                }}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { logOut } from "../../services/authSlice";
import { IUser } from "../../types";

function Navigation({
  token,
  profile,
}: {
  token?: string | null;
  profile?: IUser | null;
}) {
  const dispatch = useAppDispatch();
  const currentPath = useLocation().pathname;

  const getName = () => {
    if (profile?.firstName && profile.lastName) {
      return `${profile?.firstName?.[0]} ${profile?.lastName?.[0]}`;
    }

    if (profile?.firstName) {
      return profile?.firstName?.[0];
    }

    return profile?.email;
  };

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Orders",
      path: "/orders",
    },
  ];

  if (profile?.isAdmin) {
    links.push({
      name: "Add Book",
      path: "/books/add",
    });
  } else {
    links.push({
      name: "Cart",
      path: "/cart",
    });
  }

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
            {links.map(({ path, name }) => {
              return (
                <Nav.Link
                  key={path}
                  className={
                    currentPath.includes(path) ? "text-dark" : "text-muted"
                  }
                >
                  <NavLink to={path}>{name}</NavLink>
                </Nav.Link>
              );
            })}
          </Nav>
          {token ? (
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

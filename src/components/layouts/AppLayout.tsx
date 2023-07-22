import Container from "react-bootstrap/Container";
import Navigation from "../Nav/Navigation";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";

function AppLayout() {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <Container fluid className="d-flex flex-column p-0 gap-4">
      <Navigation token={accessToken} />
      <Outlet />
    </Container>
  );
}

export default AppLayout;

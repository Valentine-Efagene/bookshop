import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navigation from "../Nav/Navigation";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { saveToken } from "../../services/authSlice";

function AppLayout() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(saveToken(accessToken));
  }, [dispatch, accessToken]);

  return (
    <Container fluid className="d-flex flex-column p-0 gap-4">
      <Navigation token={accessToken} />
      <Outlet />
    </Container>
  );
}

export default AppLayout;

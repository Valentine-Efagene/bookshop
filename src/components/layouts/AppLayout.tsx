import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navigation from "../Nav/Navigation";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { saveToken } from "../../services/authSlice";

function AppLayout() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(saveToken(accessToken));
  }, [dispatch, accessToken]);

  return (
    <Container fluid className="d-flex flex-column">
      <Navigation token={accessToken} />
      <Container fluid className={`${styles.content} d-flex flex-column`}>
        <Outlet />
      </Container>
    </Container>
  );
}

export default AppLayout;

import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navigation from "../Nav/Navigation";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import { persistor, useAppDispatch, useAppSelector } from "../../store";
import { saveToken, setProfile } from "../../services/authSlice";
import { useGetProfileQuery } from "../../services/api";
import { IAPIError } from "../../types";

function AppLayout() {
  const dispatch = useAppDispatch();
  const { accessToken, profile } = useAppSelector((state) => state.auth);

  const { data: user, error } = useGetProfileQuery(accessToken);

  useEffect(() => {
    dispatch(setProfile(user));
  }, [user, dispatch]);

  useEffect(() => {
    if ((error as IAPIError)?.data?.message.includes("expired")) {
      persistor.purge();
    }
  }, [error]);

  useEffect(() => {
    dispatch(saveToken(accessToken));
  }, [dispatch, accessToken]);

  return (
    <Container fluid className="d-flex flex-column">
      <Navigation token={accessToken} profile={profile} />
      <Container fluid className={`${styles.content} d-flex flex-column`}>
        <Outlet />
      </Container>
    </Container>
  );
}

export default AppLayout;

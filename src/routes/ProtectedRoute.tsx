import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
// https://stackoverflow.com/a/69592617/6132438

interface IProps {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  return accessToken == null ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;

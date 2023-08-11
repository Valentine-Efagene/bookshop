import { ReactElement } from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { IUser } from "../types";
// https://stackoverflow.com/a/69592617/6132438

interface IProps {
  children: ReactElement;
}

const AdminRoute = ({ children }: IProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken) return <Navigate to="/" />;

  const user: Partial<IUser> = jwt_decode(accessToken);

  return user.isAdmin == false ? <Navigate to="/" /> : children;
};

export default AdminRoute;

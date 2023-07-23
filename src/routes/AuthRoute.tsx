import { useNavigate } from "react-router-dom";
import { ReactElement, useLayoutEffect } from "react";
import { useAppSelector } from "../store";

interface IProps {
  children: ReactElement;
}

const AuthRoute = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [navigate, accessToken]);

  return <>{children}</>;
};

export default AuthRoute;

import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp";
import AppLayout from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch/NoMatch";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";

// https://reactrouter.com/en/main/routers/picking-a-router#web-projects
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: (
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

export { router };

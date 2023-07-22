import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp";
import AppLayout from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch/NoMatch";

// https://reactrouter.com/en/main/routers/picking-a-router#web-projects
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

export { router };

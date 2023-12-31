import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp";
import AppLayout from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch/NoMatch";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Books from "./pages/Books/Books";
import AddBook from "./pages/AddBook/AddBook";
import AuthRoute from "./routes/AuthRoute";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import Orders from "./pages/Orders/Orders";
import Order from "./pages/Order/Order";
import AdminRoute from "./routes/AdminRoute";
import EditBook from "./pages/EditBook/EditBook";

// https://reactrouter.com/en/main/routers/picking-a-router#web-projects
const router = createBrowserRouter([
  {
    path: "",
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
        path: "/signup",
        element: (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      {
        path: "/orders",
        children: [
          {
            path: "/orders/:id",
            element: (
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            ),
          },
          {
            path: "/orders",
            element: (
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/books",
        children: [
          {
            path: "/books",
            element: (
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            ),
          },
          {
            path: "/books/:id/edit",
            element: (
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            ),
          },
          {
            path: "/books/add",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <AddBook />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

export { router };

import { RouterProvider } from "react-router-dom";
import "./custom.scss";
import "./App.css";
import { router } from "./Router";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

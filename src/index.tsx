import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/authContext";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </QueryClientProvider>
);

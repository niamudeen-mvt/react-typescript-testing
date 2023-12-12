import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import { renderRoutes, routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {renderRoutes(routes)}
    </BrowserRouter>
  );
}

export default App;

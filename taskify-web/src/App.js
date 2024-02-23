import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route Component={PrivateRoutes}>
          <Route Component={Dashboard} path="/dashboard" />
        </Route>
        <Route Component={Login} path="/" />
      </Routes>
    </Router>
  );
}

export default App;

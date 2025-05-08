import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Usuario from "./components/Usuario";
import { Cars } from "./components/Cars";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Callback from "./callback";
import Dashboard from "./dashboard";
import Login from "./login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Callback from "./callback";
import Dashboard from "./dashboard";
import Login from "./login";
import usePageTracking from "./hooks/usePageTracking";

function AppRoutes() {
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

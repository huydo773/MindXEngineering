import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<iframe src="/login.html" style={{ width: "100%", height: "100vh", border: "none" }} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.scss";
import Cocktails from "./components/Cocktails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cocktails" element={<Cocktails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

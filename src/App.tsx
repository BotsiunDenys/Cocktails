import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Menu from "./components/Menu";
import Cocktails from "./components/Cocktails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Home />} />
          <Route path="/cocktails" element={<Cocktails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

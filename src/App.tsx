import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cocktails from "./components/Cocktails";
import InfoCocktail from "./components/InfoCocktail";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cocktails" element={<Cocktails />}/>
        <Route path="cocktails/:id" element={<InfoCocktail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.scss";

const Home = lazy(() => import("./components/Home"));
const Cocktails = lazy(() => import("./components/Cocktails"));
const InfoCocktail = lazy(() => import("./components/InfoCocktail"));

function App() {
  return (
    <Suspense fallback={<h1 className="pageLoading">Loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cocktails" element={<Cocktails />} />
          <Route path="cocktails/:id" element={<InfoCocktail />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

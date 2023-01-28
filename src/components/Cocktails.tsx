import { useState } from "react";
import "../style/cocktails.scss";
import { cocktails } from "../data";
import CardCocktail from "./CardCocktail";

const Cocktails = () => {
  const [searchParams, setSearchParams] = useState("name");
  return (
    <div className="cocktails-page">
      <header className="cocktails-page_header">Drink passion</header>
      <main className="cocktails-page_main">
        <div className="cocktails-page_params">
          <label htmlFor="searchParams" className="cocktails-page_selectTitle">
            Search by:
          </label>
          <select
            className="cocktails-page_select"
            name="searchParams"
            id="searchParams"
            onChange={(e) => setSearchParams(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="first letter">First letter</option>
          </select>
        </div>
        <form className="cocktails-page_search">
          <input
            className="cocktails-page_input"
            type="text"
            placeholder={`Search by ${searchParams}`}
          />
          <input
            type="submit"
            value="Search"
            className="cocktails-page_searchBtn"
          />
        </form>
      </main>
      <p className="cocktails-page_randomTitle">Random cocktails for you</p>
      <section className="cocktails-page_randomItems">
        {cocktails.map((cocktail) => (
          <CardCocktail
            key={cocktail.idDrink}
            id={cocktail.idDrink}
            photo={cocktail.strDrinkThumb}
            name={cocktail.strDrink}
          />
        ))}
      </section>
    </div>
  );
};

export default Cocktails;

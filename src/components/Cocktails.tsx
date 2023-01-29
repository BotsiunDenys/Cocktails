import { useState, useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { COCKTAILS } from "../data";
import CardCocktail from "./CardCocktail";
import "../style/cocktails.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getCocktail } from "../slice/cocktailSlice";

const Cocktails = () => {
  const [searchParams, setSearchParams] = useState("name");
  const searchInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector((state) => state.cocktails.cocktails);
  const loading = useAppSelector((state) => state.cocktails.loading);
  const error = useAppSelector((state) => state.cocktails.error);
  return (
    <div className="cocktails-page">
      <Link to="/" className="cocktails-page_goHomeBtn">
        <AiOutlineHome />
      </Link>
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
        <form
          className="cocktails-page_search"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchInput.current) {
              if (searchInput.current.value) {
                dispatch(getCocktail(searchInput.current.value));
              }
            }
          }}
        >
          <input
            className="cocktails-page_input"
            type="text"
            placeholder={`Search by ${searchParams}`}
            ref={searchInput}
          />
          <input
            type="submit"
            value="Search"
            className="cocktails-page_searchBtn"
          />
        </form>
      </main>
      {!cocktails.length && (
        <>
          <p className="cocktails-page_Title">Random cocktails for you</p>
          <section className="cocktails-page_Items">
            {COCKTAILS.map((cocktail) => (
              <CardCocktail
                key={cocktail.idDrink}
                id={cocktail.idDrink}
                photo={cocktail.strDrinkThumb}
                name={cocktail.strDrink}
              />
            ))}
          </section>
        </>
      )}
      {cocktails.length && (
        <>
          <p className="cocktails-page_Title">Cocktails matching your search</p>
          <section className="cocktails-page_Items">
            {cocktails.map((cocktail) => (
              <CardCocktail
                key={cocktail.idDrink}
                id={cocktail.idDrink}
                photo={cocktail.strDrinkThumb}
                name={cocktail.strDrink}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default Cocktails;

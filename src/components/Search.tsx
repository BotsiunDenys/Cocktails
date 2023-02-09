import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineStar } from "react-icons/ai";
import { FaRandom } from "react-icons/fa";
import { GiCardRandom } from "react-icons/gi";
import { useAppDispatch } from "../store/store";
import {
  getCocktailByName,
  getCocktailByFirstLetter,
  getOneRandom,
  getTenRandom,
} from "../slice/cocktailSlice";
import { clearCocktailsState } from "../slice/cocktailSlice";
import { clearIngredientsCocktailsState } from "../slice/getCocktailsByIngredientSlice";
import { getCocktailsByIngredient } from "../slice/getCocktailsByIngredientSlice";
import { toggleOverlay } from "../slice/favouriteVisibilitySlice";
import FavouriteDrinks from "./FavouriteDrinks";

const Search = () => {
  const [searchParams, setSearchParams] = useState("name");
  const searchInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="cocktails-page_headerSection">
        <Link to="/" className="cocktails-page_goHomeBtn">
          <AiOutlineHome />
        </Link>
        <span
          className="cocktails-page_showFavouriteOverlay"
          onClick={() => dispatch(toggleOverlay())}
        >
          <AiOutlineStar />
        </span>
      </div>
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
            <option value="ingredient">Ingredient</option>
          </select>
        </div>
        <form
          className="cocktails-page_search"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchInput.current) {
              if (searchInput.current.value) {
                if (searchParams === "name") {
                  dispatch(clearIngredientsCocktailsState());
                  dispatch(getCocktailByName(searchInput.current.value));
                } else if (searchParams === "first letter") {
                  dispatch(clearIngredientsCocktailsState());
                  const searchValue = searchInput.current.value[0];
                  dispatch(getCocktailByFirstLetter(searchValue));
                } else {
                  dispatch(clearCocktailsState());
                  dispatch(getCocktailsByIngredient(searchInput.current.value));
                }
                searchInput.current.value = "";
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
        <div className="cocktails-page_randomItems">
          <button
            className="cocktails-page_oneRandom cocktails-page_searchRandom"
            onClick={() => dispatch(getOneRandom())}
          >
            <FaRandom />
            <span className="cocktails-page_searchRandomText">
              Search one random
            </span>
          </button>
          <button
            className="cocktails-page_tenRandom cocktails-page_searchRandom"
            onClick={() => dispatch(getTenRandom())}
          >
            <GiCardRandom />
            <span className="cocktails-page_searchRandomText">
              Search ten random
            </span>
          </button>
        </div>
      </main>
      <FavouriteDrinks />
    </>
  );
};

export default Search;

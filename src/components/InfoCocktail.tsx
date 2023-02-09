import { useNavigate, useParams } from "react-router-dom";
import { BiDrink } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../store/store";
import { toggleOverlay } from "../slice/favouriteVisibilitySlice";
import { addFavourite } from "../slice/favouriteDrinksSlice";
import FavouriteDrinks from "./FavouriteDrinks";
import "../style/infoCocktail.scss";

const InfoCocktail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector((state) => state.cocktails.cocktails);
  const cocktail = cocktails?.find((item) => item.idDrink === id);
  const favouriteCocktail = useAppSelector(
    (state) => state.favouriteDrinks.favouriteDrinks
  );
  const isFavourite = favouriteCocktail?.find((item) => item.idDrink === id);
  const fullIngredientsList: Array<string> = [];
  const fullMeasureList: Array<string> = [];
  if (cocktail) {
    Object.entries(cocktail).forEach(([key, value]) => {
      if (key.startsWith("strIngredient")) {
        fullIngredientsList.push(value);
      }
      if (key.startsWith("strMeasure")) {
        fullMeasureList.push(value);
      }
    });
  }
  const ingredients = fullIngredientsList.filter((item) => item !== null);
  const measures = fullMeasureList.filter((item) => item !== null);

  return (
    <div className="infoCocktail">
      <div className="infoCocktail_headerSection">
        <span onClick={() => navigate(-1)} className="infoCocktail_goBackBtn">
          <BiDrink />
        </span>
        <span
          className="infoCocktail_showFavouriteOverlay"
          onClick={() => dispatch(toggleOverlay())}
        >
          <AiOutlineStar />
        </span>
      </div>
      <header className="infoCocktail_header">{cocktail?.strDrink}</header>
      <main className="infoCocktail_main">
        <input
          type="image"
          src={cocktail?.strDrinkThumb}
          alt={`${cocktail?.strDrink} photo`}
          className="infoCocktail_img"
        />
        <div className="infoCocktail_receipt">
          <h2 className="infoCocktail_ingredientsTitle infoCocktail_title">
            Ingredients:
          </h2>
          <ul className="infoCocktail_ingredients infoCocktail_info">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="infoCocktail_singleIngredient">
                {ingredient}
              </li>
            ))}
          </ul>
          <h2 className="infoCocktail_measuresTitle infoCocktail_title">
            Measures:
          </h2>
          <ul className="infoCocktail_measures infoCocktail_info">
            {measures.map((measure, index) => (
              <li key={index} className="infoCocktail_singleMeasure">
                {measure}
              </li>
            ))}
          </ul>
          <h2 className="infoCocktail_instructionTitle infoCocktail_title">
            Instruction:
          </h2>
          <p className="infoCocktail_instruction">
            {cocktail?.strInstructions}
          </p>
          <button
            className="infoCocktail_addToFavourite"
            onClick={() => {
              if (cocktail) {
                if (!isFavourite) {
                  dispatch(addFavourite(cocktail));
                }
                dispatch(toggleOverlay());
              }
            }}
          >
            <AiOutlineStar />
          </button>
        </div>
      </main>
      <FavouriteDrinks />
    </div>
  );
};

export default InfoCocktail;

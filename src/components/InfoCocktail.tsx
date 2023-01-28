import { useNavigate, useParams } from "react-router-dom";
import { cocktails } from "../data";
import "../style/infoCocktail.scss";

const InfoCocktail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cocktail = cocktails.find((item) => item.idDrink === id);
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
      <button onClick={() => navigate(-1)} className="infoCocktail_goBackBtn">
        back
      </button>
      <header className="infoCocktail_header">{cocktail?.strDrink}</header>
      <main className="infoCocktail_main">
        <input
          type="image"
          src={cocktail?.strDrinkThumb}
          alt={`${cocktail?.strDrink} photo`}
          className="infoCocktail_img"
        />
        <div className="infoCocktail_receipt">
          <h2 className="infoCocktail_ingredientsTitle">Ingredients:</h2>
          <ul className="infoCocktail_ingredients">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="infoCocktail_singleIngredient">
                {ingredient}
              </li>
            ))}
          </ul>
          <h2 className="infoCocktail_measuresTitle">Measures:</h2>
          <ul className="infoCocktail_measures">
            {measures.map((measure, index) => (
              <li key={index} className="infoCocktail_singleMeasure">
                {measure}
              </li>
            ))}
          </ul>
          <h2 className="infoCocktail_instructionTitle">Instruction:</h2>
          <p className="infoCocktail_instrucion">{cocktail?.strInstructions}</p>
        </div>
      </main>
    </div>
  );
};

export default InfoCocktail;

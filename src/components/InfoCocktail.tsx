import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppSelector } from "../store/store";
import "../style/infoCocktail.scss";

const InfoCocktail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cocktails = useAppSelector((state) => state.cocktails.cocktails);
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
        <AiOutlineArrowLeft />
      </button>
      <header className="infoCocktail_header">
        <p className="infoCocktail_headerTitle">{cocktail?.strDrink}</p>
      </header>
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
        </div>
      </main>
    </div>
  );
};

export default InfoCocktail;

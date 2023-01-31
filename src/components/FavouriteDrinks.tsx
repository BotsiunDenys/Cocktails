import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../store/store";
import { toggleOverlay } from "../slice/favouriteVisibilitySlice";
import {
  removeFavourite,
  clearFavourites,
} from "../slice/favouriteDrinksSlice";
import "../style/favouriteDrinks.scss";
import { useNavigate } from "react-router-dom";

const FavouriteDrinks = () => {
  const navigate = useNavigate();
  const visibility = useAppSelector(
    (state) => state.favouriteVisibility.visibility
  );
  const favouriteDrinks = useAppSelector(
    (state) => state.favouriteDrinks.favouriteDrinks
  );
  const dispatch = useAppDispatch();
  return (
    <div
      className={
        visibility ? "favouriteOverlay overlay-show" : "favouriteOverlay"
      }
    >
      <aside
        className={
          visibility ? "favouriteSection favouritesShow" : "favouriteSection"
        }
      >
        <header className="favouriteSection_header">
          <p
            className="favouriteSection_closeSection"
            onClick={() => dispatch(toggleOverlay())}
          >
            <AiOutlineClose />
          </p>
          <p className="favouriteSection_headerText">Your favourite drinks</p>
        </header>
        <section className="favouriteSection_favouriteDrinks">
          {favouriteDrinks?.map((drink) => (
            <div key={drink.idDrink} className="favouriteSection_singleDrink">
              <input
                type="image"
                src={drink.strDrinkThumb}
                alt={`${drink.strDrink} img`}
                className="favouriteSection_singleDrink_img"
                onClick={() => {
                  dispatch(toggleOverlay());
                  navigate(`/cocktails/${drink.idDrink}`);
                }}
              />
              <div className="favouriteSection_singleDrink_main">
                <p className="favouriteSection_singleDrink_title">
                  {drink.strDrink}
                </p>
                <button
                  className="favouriteSection_singleDrink_remove"
                  onClick={() => dispatch(removeFavourite(drink.idDrink))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </section>
        <button
          className="favouriteSection_clearFavourites"
          onClick={() => {
            dispatch(clearFavourites());
            dispatch(toggleOverlay());
          }}
        >
          Clear all
        </button>
      </aside>
    </div>
  );
};

export default FavouriteDrinks;

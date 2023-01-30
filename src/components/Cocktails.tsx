import CardCocktail from "./CardCocktail";
import { useAppSelector } from "../store/store";
import "../style/cocktails.scss";
import Search from "./Search";

const Cocktails = () => {
  const cocktails = useAppSelector((state) => state.cocktails.cocktails);
  const loading = useAppSelector((state) => state.cocktails.loading);
  const error = useAppSelector((state) => state.cocktails.error);
  if (loading) {
    return (
      <div className="cocktails-page">
        <Search />
        <h1 className="cocktails-page_loading">Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="cocktails-page">
        <Search />
        <h1 className="cocktails-page_error">{error}</h1>
      </div>
    );
  }
  return (
    <div className="cocktails-page">
      <Search />
      {cocktails.length !== 0 && (
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

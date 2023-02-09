import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getOneCocktail } from "../slice/cocktailSlice";
import "../style/cardCocktail.scss";
interface Props {
  name: string;
  photo: string;
  id: string;
}

const CardCocktail = ({ photo, name, id }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector((state) => state.cocktails.cocktails);
  const cocktail = cocktails.find((item) => item.idDrink === id);
  return (
    <div
      className="card_singleItem"
      onClick={() => {
        if (!cocktail) {
          dispatch(getOneCocktail(id));
        }
        navigate(`${id}`);
      }}
    >
      <input
        type="image"
        src={photo}
        alt={`${name} photo`}
        className="card_singleItem_img"
      />
      <p className="card_singleItem_name">{name}</p>
    </div>
  );
};

export default CardCocktail;

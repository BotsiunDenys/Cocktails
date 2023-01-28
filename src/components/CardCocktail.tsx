import { useNavigate } from "react-router-dom";
import "../style/cardCocktail.scss";
interface Props {
  name: string;
  photo: string;
  id: string;
}

const CardCocktail = ({ photo, name, id }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="card_singleItem" onClick={() => navigate(`${id}`)}>
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

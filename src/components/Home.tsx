import { Link } from "react-router-dom";
import "../style/home.scss";
const Home = () => {
  return (
    <div className="home">
      <div className="home_title">
        <h1 className="home_title_text">Drink passion</h1>
        <p className="home_title_desc">
          Service for searching an alcoholic cocktails
        </p>
        <Link to="cocktails" className="home_title_link">
          Find your drink
        </Link>
      </div>
    </div>
  );
};

export default Home;

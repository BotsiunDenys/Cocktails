import { Link } from "react-router-dom";
import "../style/home.scss";
const Home = () => {
  return (
    <div className="home">
      <div className="home_title">
        <h1 className="home_title_text">Passion drink</h1>
        <Link to='cocktails' className="home_title_link">Learn more</Link>
      </div>
    </div>
  );
};

export default Home;

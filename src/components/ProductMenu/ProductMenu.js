import { Link } from "react-router-dom";

const ProductMenu = () => {
  return (
    <div>
      <div className="navbar">
        <Link to="/categorie/bikes">
          <button className="productMenu" type="button">
            Bikes
          </button>
        </Link>
        <Link to="/categorie/parts">
          <button className="productMenu" type="button">
            Parts
          </button>
        </Link>
        <Link to="/search">
          <button className="productMenu" type="button">
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ProductMenu;

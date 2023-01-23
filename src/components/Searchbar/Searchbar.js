import React, { useEffect, useState } from "react";
import { setProducts, setTotalPages } from "../../redux/reducers/products";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Searchbar = () => {
  const [wordQuery, setWordQuery] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wordQuery.length > 3) {
      setLoading(true);
      const searchProducts = async () => {
        const url = `${process.env.REACT_APP_API_URL}products/search?page=1&limit=5&title=${wordQuery}`;
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            dispatch(setProducts(data));
            setLoading(false);
          } else {
            console.error("Fetch error!");
            return "No products found!!";
          }
        } catch (e) {
          console.log(e.message);
        }
      };
      searchProducts();
    }
  }, [wordQuery]);

  return (
    <div className="products">
      <input
        onChange={(event) => setWordQuery(event.target.value)}
        type="text"
        placeholder="Search for products ..."
      />

      <div>
        {loading ? (
          <p>Start searching ...</p>
        ) : (
          <div>
            <div>
              {products.map((product) => (
                <div className="singlePreviewProduct">
                  <Link
                    to={`/${product._id}`}
                    style={{ backgroundColor: "#f7f7f7" }}
                  >
                    <div>
                      <h2>{product.title}</h2>
                      <img
                        src={product.imgUrl}
                        alt={product.title}
                        className="previewImage"
                      />
                      <p>{product.price} €</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;

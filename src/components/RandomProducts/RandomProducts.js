import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/reducers/products";

const RandomProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = `${process.env.REACT_APP_API_URL}products/randomProducts`;
      try {
        setLoading(true);
        const res = await fetch(url);
        console.log(res);
        if (res.ok) {
          const data = await res.json();
          dispatch(setProducts(data));
          setLoading(false);
        } else {
          console.error("Fetch error!");
          alert("There has been an error!");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchProducts();
  }, []);

  const renderFunc = () => {
    if (loading) {
      return (
        <div>
          <p>Site is loading...</p>
        </div>
      );
    } else if (products.length === 0) {
      return (
        <div>
          <p>"No products found!!"</p>
        </div>
      );
    } else {
      return (
        <div className="randomProducts">
          {products.map((product) => (
            <div>
              <Link to={product._id} style={{ backgroundColor: "#f7f7f7" }}>
                <div className="randomProductsElement">
                  <h2>{product.title}</h2>
                  <img src={product.imgUrl} alt={product.title} />
                  <p>{product.price} €</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    }
  };

  return <div>{renderFunc()}</div>;
};
export default RandomProducts;

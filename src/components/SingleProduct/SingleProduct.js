import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/reducers/products";
import { setCart } from "../../redux/reducers/cart";
import { Link } from "react-router-dom";

function SingleProduct() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [button, setButton] = useState(true);

  const searchProducts = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_URL}products/single/${id}`;
    try {
      setLoading(true);
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();

        const singleProduct = await dispatch(setProducts(data));
        console.log(singleProduct);
        checkIfInCart(singleProduct);
        setLoading(false);
      } else {
        console.error("Fetch error!");
        return "No products found!!";
      }
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    searchProducts();
  }, [searchProducts]);

  useEffect(() => {
    console.log("once");
  }, []);

  const checkIfInCart = (singleProduct) => {
    const check = cartProducts.find(
      (product) => product.title === singleProduct.title
    );
    console.log(check);
    if (check) {
      setButton(false);
    }
  };

  const addToCart = () => {
    const action = setCart(products);
    dispatch(action);
    setButton(false);
  };

  const displayedProducts = () => {
    if (!products) {
      return (
        <div>
          <p>No products found...</p>
        </div>
      );
    } else if (!Array.isArray(products)) {
      return (
        <div className="products">
          <div>
            <h1>{products.title}</h1>
          </div>
          <div>
            <img src={products.imgUrl} alt={products.title} />

            <p>{products.description}</p>
            <p>{products.price} €</p>
            {button ? (
              <button type="button" className="zeroMargin" onClick={addToCart}>
                Add to cart
              </button>
            ) : (
              <Link to="/user/cart">
                <button type="button" className="zeroMargin">
                  Cart
                </button>
              </Link>
            )}
          </div>
        </div>
      );
    } else if (Array.isArray(products)) {
      return (
        <div>
          <div>
            {products.map((product) => (
              <div>
                <Link
                  to={`/${product._id}`}
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <div>
                    <h2>{product.title}</h2>
                    <img src={product.imgUrl} alt={product.title} />
                    <p>{product.price} €</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {loading ? <p>Site is loading...</p> : <div>{displayedProducts()}</div>}
    </div>
  );
}

export default SingleProduct;

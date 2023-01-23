import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartDeleted } from "../../redux/reducers/cart";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sum = cartProducts.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 4.99);

  const postOrder = async (event) => {
    event.preventDefault();
    navigate("/user/checkout");
  };

  const displayedProducts = () => {
    if (cartProducts.length === 0) {
      return (
        <div>
          <br></br>
          <p>There are no products in your cart. Start shopping now!</p>
        </div>
      );
    } else if (Array.isArray(cartProducts)) {
      return (
        <div className="products">
          <br></br>
          <div>
            {cartProducts.map((product) => (
              <div>
                <ul>
                  <Link to={`/${product._id}`}>
                    <li>{product.title}</li>
                    <li>{product.price} €</li>
                  </Link>
                  <li>
                    <button
                      type="button"
                      className="zeroMargin"
                      onClick={() => {
                        dispatch(setCartDeleted(product._id));
                      }}
                    >
                      Delete from cart
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <ul>
            <li>Shipping costs: 4,99€</li>
            <li>Total Price: {sum}€</li>

            <button
              type="button"
              className="zeroMargin buyButton"
              onClick={postOrder}
            >
              Buy now!
            </button>
          </ul>
        </div>
      );
    }
  };

  return <div>{displayedProducts()}</div>;
}

export default Cart;

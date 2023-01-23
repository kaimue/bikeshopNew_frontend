import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CartButton() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  return (
    <div>
      <Link to="/user/cart">
        <button type="button">Cart | {cartProducts.length}</button>
      </Link>
    </div>
  );
}

export default CartButton;

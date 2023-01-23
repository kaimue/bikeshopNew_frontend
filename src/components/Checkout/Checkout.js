import React from "react";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useNavigate } from "react-router-dom";

function Checkout() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const amount = cartProducts.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 4.99);

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "EUR",
  };

  const navigate = useNavigate();

  return (
    <div className="products">
      <ul>
        <div>
          {cartProducts.map((product) => (
            <div>
              <li>{product.title}</li>
              <li>{product.price} €</li>

              <li></li>
            </div>
          ))}
        </div>
        <li>Shipping costs: 4,99€</li>
        <li>Total Price: {amount}€</li>
        <li>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{
                color: "silver",
                tagline: false,
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  navigate("/user/payed");
                });
              }}
            />
          </PayPalScriptProvider>
        </li>
      </ul>
    </div>
  );
}

export default Checkout;

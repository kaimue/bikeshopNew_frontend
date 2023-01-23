import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const signupFunc = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          address: { city, zipCode, street, houseNumber },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(login({ token: data }));
        localStorage.setItem("token", data);
      } else {
        console.error("Fetch error!");
        alert("There has been an error!");
      }
    } catch (error) {
      console.error(error.message);
    }
    navigate("/home");
  };

  return (
    <div>
      <div>
        <form onSubmit={signupFunc}>
          <label htmlFor="firstName">First name:</label>

          <input
            type="text"
            id="firstName"
            name="firstname"
            placeholder="firstname"
            onChange={(event) => setFirstName(event.target.value)}
          />

          <label htmlFor="lastName">Last name:</label>

          <input
            type="text"
            id="lastName"
            name="lastname"
            placeholder="lastname"
            onChange={(event) => setLastName(event.target.value)}
          />

          <label htmlFor="city">City:</label>

          <input
            type="text"
            id="city"
            name="city"
            placeholder="city"
            onChange={(event) => setCity(event.target.value)}
          />

          <label htmlFor="zipCode">Zip code:</label>

          <input
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="zipCode"
            onChange={(event) => setZipCode(event.target.value)}
          />

          <label htmlFor="street">Street:</label>

          <input
            type="text"
            id="street"
            name="street"
            placeholder="street"
            onChange={(event) => setStreet(event.target.value)}
          />

          <label htmlFor="hoseNumber">House number:</label>

          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            placeholder="houseNumber"
            onChange={(event) => setHouseNumber(event.target.value)}
          />

          <label htmlFor="email">Email:</label>

          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password:</label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <input type="submit" value="Submit" />

          <label>Already have an account? Login here.</label>

          <Link to="/user/login">
            <button type="button">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

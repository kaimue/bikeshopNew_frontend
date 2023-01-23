import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
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
    navigate("/");
  };

  return (
    <div>
      <div>
        <div className="products">
          <br></br>
          <form onSubmit={loginFunc}>
            <label htmlFor="email">Email:</label>
            <br></br>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <br></br>
            <label htmlFor="password">Password:</label>
            <br></br>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <br></br>
            <button type="submit" value="Submit" className="zeroMargin">
              Login
            </button>
            <br></br>
            <br></br>
            <label htmlFor="signUp">No account yet? Sign up here.</label>
            <br></br>
            <Link to="/user/signup">
              <button type="button" className="zeroMargin">
                Sign up
              </button>
            </Link>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

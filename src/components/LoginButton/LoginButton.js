import React from "react";
import { Link } from "react-router-dom";

function LoginButton() {
  return (
    <div>
      <Link to="/user/login">
        <button type="button">Login</button>
      </Link>
    </div>
  );
}

export default LoginButton;

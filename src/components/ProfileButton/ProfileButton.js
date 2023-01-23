import React from "react";
import { Link } from "react-router-dom";

function ProfileButton() {
  return (
    <div>
      <Link to="/user/protected/profile">
        <button type="button">Profile</button>
      </Link>
    </div>
  );
}

export default ProfileButton;

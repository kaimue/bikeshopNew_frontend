import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const decoded = jwt_decode(token);

  useEffect(() => {
    const getUser = async () => {
      const url = `${process.env.REACT_APP_API_URL}user/${decoded.id}`;
      try {
        setLoading(true);
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setLoading(false);
        } else {
          console.error("Fetch error!");
          return "No user found!";
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  return (
    <div className="products">
      {loading ? (
        <p>Site is loading...</p>
      ) : (
        <div>
          <br></br>
          <ul>
            <li>First name: {user.firstName}</li>
            <li>Last name: {user.lastName}</li>
            <li>Email: {user.email}</li>
          </ul>
          <br></br>
          <ul>
            <li>Address:</li>
            <li>City: {user.address.city}</li>
            <li>Zip Code: {user.address.zipCode}</li>
            <li>
              Street: {user.address.street},{user.address.houseNumber}
            </li>
          </ul>
          <br></br>
        </div>
      )}
    </div>
  );
};
export default Profile;

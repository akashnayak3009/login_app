import React from "react";
import "../styles/Navbar.css";
import { useAuth } from "../authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import axios from "axios";

const Navbar = () => {
  const { logout, token, userId } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    postLogOutActivity();
    navigate("/login");
  };
  const handleClick = () => {
    alert("This is Notfication");
  };

  const postLogOutActivity = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/activity/post",
        config,
        { userId },
        
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log("Error while Post  Logout activity", error);
    }
  };
  return (
    <nav className="navbar">
      <div className="logo">User Management App</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li style={{ color: "white", textDecoration: "none" }}>
          <Link to="/update" style={{ color: "white", textDecoration: "none" }}>
            Profile
          </Link>
        </li>
        <li>
          <IoNotifications onClick={handleClick} />
        </li>
      </ul>
      <button className="sign-out-button" onClick={handleLogOut}>
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;

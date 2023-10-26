import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../authContext/AuthContext";
import ActivityDetails from "../components/ActivityFeed";

const UserDashboard = () => {
  const [userProfile, setUserProfile] = useState([]);
  const { token, userId } = useAuth();
  const [isNightMode, setIsNightMode] = useState(false); // Theme state



  // Function to toggle the theme
  const toggleTheme = () => {
    setIsNightMode((prev) => !prev);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:5000/api/user/fetchProfile/${userId}`,
          config
        );
        const data = response.data;
        console.log(data.getProfile);
        setUserProfile(data.getProfile);
      } catch (error) {
        console.log("Error while fetching", error);
      }
    };
    fetchUsers();
  }, [userId]);

  return (
    <div>
      <div>
        <Navbar />
        <h2>Welcome to User Dashboard</h2>
        <button onClick={toggleTheme}>
          {isNightMode ? " Day Mode" : " Night Mode"}
        </button>
      </div>
      <div>
        <div
          style={{
            margin: "50px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            maxWidth: "300px",
            backgroundColor: isNightMode ? "black" : "white", // Set background color based on theme
            color: isNightMode ? "white" : "black", // Set text color based on theme
          }}
        >
          <h2 style={{ color: "blue" }}>Name: {userProfile.username}</h2>
          <p style={{ color: "green" }}>Email: {userProfile.email}</p>
          <p style={{ color: "orange" }}>Mobile: {userProfile.mobile}</p>
          <p style={{ color: "red" }}>Role: {userProfile.roles}</p>
          <ActivityDetails />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

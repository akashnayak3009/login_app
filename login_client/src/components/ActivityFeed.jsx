import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../authContext/AuthContext";

const ActivityDetails = () => {
  const [lastLogin, setLastLogin] = useState(null);
  const [lastLogout, setLastLogout] = useState(null);

 const {token, userId} = useAuth();
  useEffect(() => {
    // Fetch user profile when the component mounts
    const fetchUsersLogin = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:5000/api/activity/login-time`,
          config,
          { userId}
        );
        const data = response.data;
        setLastLogin(data);
        console.log(data.loginTimestamp);
      } catch (error) {
        console.log("Error while fetching", error);
      }
    };
    fetchUsersLogin();
  }, [userId]);

  useEffect(() => {
    const fetchUsersLogout = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:5000/api/activity/logout-time`,
          config,
          { userId}
        );
        const data = response.data;
        setLastLogout(data);
        console.log(data.logoutTimestamp);
      } catch (error) {
        console.log("Error while fetching", error);
      }
    };
    fetchUsersLogout();
  }, [userId]);
  return (
    <div>
      <h2>Activity Details</h2>
     
      <div>
        <h3>Last Login: {lastLogin?.loginTimestamp || "N/A"}</h3>
        <h3>Last Logout: {lastLogout?.logoutTimestamp || "N/A"}</h3>
      </div>
    </div>
  );
};

export default ActivityDetails;

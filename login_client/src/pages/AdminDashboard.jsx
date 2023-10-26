import React from "react";
import Navbar from "../components/Navbar";
import UserProfile from "../components/UserProfile";

const AdminDashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
        <h2>Welcome to Admin Dashboard</h2>
      </div>
      <div>
        <UserProfile />
      </div>
    </div>
  );
};

export default AdminDashboard;

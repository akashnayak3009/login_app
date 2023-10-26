import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext/AuthContext";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/api/user/fetchAllProfile",
        config
      );
      const data = response.data;
      console.log(data);
      setUsers(data.allUser);
      console.log(data.allUser);
    } catch (error) {
      console.log(error);
    }
  };

   // Filter the users based on the search term
   useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  // Fetch user data from the API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="user-profile-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th className="table-header">User Image</th>
            <th className="table-header">Username</th>
            <th className="table-header">Mobile</th>
            <th className="table-header">Email</th>
            <th className="table-header">Biography</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredUsers) ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.user_image}
                    alt="User"
                    className="user-image"
                  />
                </td>
                <td className="user-data">{user.username}</td>
                <td className="user-data">{user.mobile}</td>
                <td className="user-data">{user.email}</td>
                <td className="user-data">{user.biography}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-users">
                No users to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;

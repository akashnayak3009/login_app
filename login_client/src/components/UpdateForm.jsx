import React, { useState, useEffect } from "react";
import axios from "axios"; // You may need to install Axios
import { useAuth } from "../authContext/AuthContext";
import "../styles/UpdateForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function UpdateForm() {
  const [userProfile, setUserProfile] = useState([]);
  const { token, userId } = useAuth();
  const [viewPassword, setViewPassword] = useState(false);

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: userProfile.username,
    email: userProfile.email,
    mobile: userProfile.mobile,
    biography: userProfile.biography,
  });

  const handleUpdateClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    handleUpdateProfile();
    setEditMode(false);
  };

  useEffect(() => {
    // Fetch user profile when the component mounts
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

  const handleUpdateProfile = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        "http://localhost:5000/api/user/updateProfile",
        formData,
        config
      );
      const data = response.data;
      console.log(data);
      toast.success("Profile updated Successfully");
    } catch (error) {
      console.log("Error while updating profile", error);
      toast.warning("Profile updated Failed");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:5000/api/user/deleteProfile/${userId}`,
        config
      );
      console.log("Account Deleted");
      toast.success("Profile Deleted");
      navigate("/");
    } catch (error) {
      console.log("Error while deleting profile", error);
      toast.warning("Profile deleted Failed");
    }
  };

  const handleBackClick = () => {
    setEditMode(false);
  };
  const handleChange = () => {
    setViewPassword(true);
  };
  const handleChangeBack = () => {
    setViewPassword(false);
  };

  return (
    <div className="profile-container">
      <ToastContainer />
      {userProfile.roles === "admin" ? (
        <Link className="back-link" to="/adminHome">
          Back
        </Link>
      ) : (
        <Link className="back-link" to="/userHome">
          Back
        </Link>
      )}
      <div className="left-side">
        <div className="user-image">
          <img src={userProfile.user_image} alt="User" />
        </div>

        {viewPassword ? (
          <div>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button className="password__save" onClick={handleSaveClick}>
              confirm
            </button>
            <button
              className="back__button"
              onClick={handleChangeBack}
              style={{ margin: "5px" }}
            >
              back
            </button>
          </div>
        ) : (
          <div>
            <button className="change__button" onClick={handleChange}>
              Change Password
            </button>
          </div>
        )}
      </div>
      <div className="right-side">
        {editMode ? (
          <>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            <lable>Biography:</lable>
            <input
              type="text"
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
            />
            <button className="update__button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel__button" onClick={handleBackClick}>
              cancel
            </button>
          </>
        ) : (
          <>
            <h2>Name: {userProfile.username}</h2>
            <p>Email: {userProfile.email}</p>
            <p>Mobile: {userProfile.mobile}</p>
            <p>Biography: {userProfile.biography}</p>
            <button className="update__button" onClick={handleUpdateClick}>
              Update
            </button>
            <button className="delete__button" onClick={handleDeleteClick}>
              Delete Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UpdateForm;

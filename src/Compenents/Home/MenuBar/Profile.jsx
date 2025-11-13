// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/profile`, {
          method: "GET",
          credentials: "include", // Send HttpOnly cookie
        });

        if (res.status === 401) {
          // Not authenticated
          navigate("/login");
          return;
        }

        const data = await res.json();
        const userData = data.user || data; // Adjust depending on backend

        setUser(userData);
        setFormData({
          username: userData.username || "",
          fullName: userData.fullName || "",
          age: userData.age || "",
          gender: userData.gender || "",
          phoneNumber: userData.phoneNumber || "",
          profileImage: userData.profileImage || "",
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Input change handler
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSave = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      const updatedUser = data.user || data; // Adjust depending on backend
      setUser(updatedUser);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile: " + err.message);
    }
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  if (!user) return (
    <div className="profile-container">
      <h2>You are not logged in</h2>
      <div>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </div>
    </div>
  );

  return (
    <div className="profile-outer">
      <div className="profile-card">
        <div className="profile-card-header">
          <button onClick={() => navigate("/")} className="profile-back">←</button>
        </div>

        <img
          src={formData.profileImage || "https://i.pravatar.cc/150?img=13"}
          alt="Profile"
          className="profile-img"
        />

        {editMode && (
          <div className="upload-section">
            <label className="upload-label">
              Upload Image
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          </div>
        )}

        <h2 className="profile-name">{user.fullName || user.username}</h2>

        <table className="profile-table">
          <tbody>
            <tr>
              <td>Username:</td>
              <td>{editMode ? <input type="text" name="username" value={formData.username} onChange={handleChange} /> : user.username}</td>
            </tr>
            <tr>
              <td>Full Name:</td>
              <td>{editMode ? <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} /> : user.fullName || "—"}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>{editMode ? <input type="number" name="age" value={formData.age} onChange={handleChange} /> : user.age || "—"}</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>{editMode ? (
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : user.gender || "—"}</td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>{editMode ? <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /> : user.phoneNumber || "—"}</td>
            </tr>
          </tbody>
        </table>

        {editMode ? (
          <>
            <button className="profile-save" onClick={handleSave}>Save</button>
            <button className="profile-cancel" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <button className="profile-edit" onClick={() => setEditMode(true)}>Edit Profile</button>
        )}

        <button onClick={handleLogout} className="profile-logout">Logout</button>
      </div>
    </div>
  );
};

export default Profile;

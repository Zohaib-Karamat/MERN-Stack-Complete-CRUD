import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:8000/api/get/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        // setError("Failed to load users. Please try again.");
        // if (err.response?.status === 500) {
        //   setError("Server error. Please try again later.");
        // } else if (err.request) {
        //   setError("Network error. Please check your connection.");
        // }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const deleteUser = async (userId, userName) => {
    // Add confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${userName}"? This action cannot be undone.`
    );
    
    if (!isConfirmed) {
      return;
    }
    
    try {
      setDeletingUserId(userId);
      const response = await axios.delete(`http://localhost:8000/api/delete/user/${userId}`);
      console.log(response.data);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
      toast.success(response.data.message, { position: "top-right" });
    } catch (err) {
      console.error("Error deleting user:", err);
      if (err.response?.status === 404) {
        toast.error("User not found", { position: "top-right" });
      } else if (err.response?.status === 500) {
        toast.error("Server error. Please try again later.", { position: "top-right" });
      } else {
        toast.error("Failed to delete user. Please try again.", { position: "top-right" });
      }
    } finally {
      setDeletingUserId(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="userTable mt-3">
        <div className="loading-container">
          <div className="spinner large"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="userTable mt-3">
        <div className="error-container">
          <div className="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" color="#e53e3e" fill="none">
              <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#e53e3e" strokeWidth="2"/>
              <path d="M8 12H16" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 8V16" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="userTable mt-3">
      <div className="header-section">
        <h1 className="page-title">User Management System</h1>
        <p className="page-subtitle">Manage your users with ease</p>
        <Link to="/add" type="button" className="btn btn-primary add-user-btn">
          Add User
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#fbfafa"
              fill="none"
            >
              <path
                d="M12 7.5C12 9.433 10.433 11 8.5 11C6.567 11 5 9.433 5 7.5C5 5.567 6.567 4 8.5 4C10.433 4 12 5.567 12 7.5Z"
                stroke="#fbfafa"
                strokeWidth="2"
              ></path>
              <path
                d="M13.5 11C15.433 11 17 9.433 17 7.5C17 5.567 15.433 4 13.5 4"
                stroke="#fbfafa"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M13.1429 20H3.85714C2.83147 20 2 19.2325 2 18.2857C2 15.9188 4.07868 14 6.64286 14H10.3571C11.4023 14 12.3669 14.3188 13.1429 14.8568"
                stroke="#fbfafa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M19 14V20M22 17L16 17"
                stroke="#fbfafa"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </Link>
      </div>
      {/* ternary operator */}
      {users.length === 0 ? (
        <div className="noData">
          <div className="no-data-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" color="#a0aec0" fill="none">
              <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#a0aec0" strokeWidth="2"/>
              <path d="M8 12H16" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>No Records To Display</h3>
          <p>Please Add New User to get started</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-bordered modern-table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                {/* for crud operations */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>
                      <span className="serial-badge">{index + 1}</span>
                    </td>
                    <td>
                      <div className="user-info">
                        {/* <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div> */}
                        <span className="user-name">{user.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="email-text">{user.email}</span>
                    </td>
                    <td>
                      <span className="address-text">{user.address}</span>
                    </td>
                    <td className="actions">
                      <Link
                        to={`/update/` + user._id}
                        type="button"
                        className="btn btn-warning"
                        title="Edit User"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          color="#f6f6f6"
                          fill="none"
                        >
                          <path
                            d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
                            stroke="#f6f6f6"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
                            stroke="#f6f6f6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </Link>

                      <button
                        onClick={() => deleteUser(user._id, user.name)}
                        type="button"
                        className="btn btn-danger"
                        title="Delete User"
                        disabled={deletingUserId === user._id}
                      >
                        {deletingUserId === user._id ? (
                          <span className="spinner"></span>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            color="#f9f8f8"
                            fill="none"
                          >
                            <path
                              d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                              stroke="#f9f8f8"
                              strokeWidth="2"
                              strokeLinecap="round"
                            ></path>
                            <path
                              d="M9 11.7349H15"
                              stroke="#f9f8f8"
                              strokeWidth="2"
                              strokeLinecap="round"
                            ></path>
                            <path
                              d="M10.5 15.6543H13.5"
                              stroke="#f9f8f8"
                              strokeWidth="2"
                              strokeLinecap="round"
                            ></path>
                            <path
                              d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5"
                              stroke="#f9f8f8"
                              strokeWidth="2"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;

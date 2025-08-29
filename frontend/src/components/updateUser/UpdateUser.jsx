import React, { useEffect, useState } from "react";
import "./UpdateUser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../../config/api";

const UpdateUser = () => {
  const initialUser = {
    name: "",
    email: "",
    address: ""
  };
  
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters long";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = "Name can only contain letters and spaces";
        }
        break;
      
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = "Please enter a valid email address";
        }
        break;
      
      case "address":
        if (!value.trim()) {
          error = "Address is required";
        } else if (value.trim().length < 5) {
          error = "Address must be at least 5 characters long";
        }
        break;
      
      default:
        break;
    }
    
    return error;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    // Validate field on blur or when user stops typing
    const error = validateField(name, value);
    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(user).forEach(field => {
      const error = validateField(field, user[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(`${API_BASE_URL}/api/get/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        if (error.response?.status === 404) {
          toast.error("User not found", { position: "top-right" });
        } else {
          toast.error("Failed to load user data", { position: "top-right" });
        }
        navigate("/");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix all errors before submitting", { position: "top-right" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.put(`${API_BASE_URL}/api/update/user/${id}`, {
        name: user.name.trim(),
        email: user.email.trim().toLowerCase(),
        address: user.address.trim()
      });
      
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        if (status === 400) {
          if (data.message && data.message.includes("email")) {
            setErrors({ email: "Email already exists" });
            toast.error("Email already exists", { position: "top-right" });
          } else {
            toast.error(data.message || "Invalid data provided", { position: "top-right" });
          }
        } else if (status === 404) {
          toast.error("User not found", { position: "top-right" });
          navigate("/");
        } else if (status === 422) {
          // Validation errors from server
          toast.error("Please check your input data", { position: "top-right" });
        } else {
          toast.error("Server error. Please try again later.", { position: "top-right" });
        }
      } else if (error.request) {
        // Network error
        toast.error("Network error. Please check your connection.", { position: "top-right" });
      } else {
        toast.error("An unexpected error occurred", { position: "top-right" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="addUser">
        <div className="loading-container">
          <div className="spinner large"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#090909" fill="none">
          <path d="M3.99982 11.9998L19.9998 11.9998" stroke="#090909" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="#090909" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg> Back
      </Link>

      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name: <span className="required">*</span></label>
          <input
            type="text"
            onChange={inputHandler}
            onBlur={(e) => {
              const error = validateField("name", e.target.value);
              if (error) setErrors({ ...errors, name: error });
            }}
            id="name"
            value={user.name}
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
            className={errors.name ? "error" : ""}
            disabled={isLoading}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="inputGroup">
          <label htmlFor="email">E-mail: <span className="required">*</span></label>
          <input
            type="email"
            onChange={inputHandler}
            onBlur={(e) => {
              const error = validateField("email", e.target.value);
              if (error) setErrors({ ...errors, email: error });
            }}
            id="email"
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder="Enter your Email"
            className={errors.email ? "error" : ""}
            disabled={isLoading}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="inputGroup">
          <label htmlFor="address">Address: <span className="required">*</span></label>
          <input
            type="text"
            onChange={inputHandler}
            onBlur={(e) => {
              const error = validateField("address", e.target.value);
              if (error) setErrors({ ...errors, address: error });
            }}
            id="address"
            name="address"
            value={user.address}
            autoComplete="off"
            placeholder="Enter your Address"
            className={errors.address ? "error" : ""}
            disabled={isLoading}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Updating User...
              </>
            ) : (
              "Update User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
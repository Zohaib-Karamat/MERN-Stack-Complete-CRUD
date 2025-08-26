import React, { useState } from "react";
import "./AddUser.css";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {toast}  from "react-hot-toast";

const AddUser = () => {
  const users={
    name:"",
    email:"",
    address:""
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e)=>{
      const { name, value } = e.target;
      console.log(name,value);
      setUser({...user,[name]:value});
  }

  const submitForm = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8000/api/user", user)
      .then((response)=>{
        toast.success(response.data.message,{position:"top-right"});
        navigate("/");
      })
      .catch((error)=>{
        console.log(error)
      })
    }

  
  return (
    <div className="addUser">
      <Link to="/" type="button" class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#090909" fill="none">
    <path d="M3.99982 11.9998L19.9998 11.9998" stroke="#090909" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="#090909" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg> Back
      </Link>

      <h3>Add New User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="address"
            name="address"
            autoComplete="off"
            placeholder="Enter your Address"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
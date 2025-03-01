import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";


export const Users = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilterusers] = useState([]);
    const[isModelOpen,setIsModelOpen] = useState(false);
    const [userData,setUserData] = useState({name : "",phonenumber : "",city: ""})
  
    const getAllUsers = async () => {
      await axios
        .get("http://localhost:8000/users")
        .then((res) => {
          setUsers(res.data);
          setFilterusers(res.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };
  
    useEffect(() => {
      getAllUsers();
    }, []);
  
    const handleSearchChange = (e) => {
      const searchText = e.target.value.toLowerCase();
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText) ||
          user.city.toLowerCase().includes(searchText)
      );
      setFilterusers(filteredUsers);
    };
  // Delete User Function
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(`http://localhost:8000/users/${id}`);
        setUsers(res.data.users); // Update state with the new user list
        setFilterusers(res.data.users);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  
  
    // Close model
    const closeModel =() =>{
      setIsModelOpen(false);
      getAllUsers();
    }
  // Add User Details
  
  const handleAddRecord = () =>{
    setUserData({name : "",phonenumber : "",city : ""})
    setIsModelOpen(true);
  }
  const handleData = (e) =>{
     setUserData({...userData,[e.target.name]:e.target.value});
  };
  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.id) {
        await axios.patch(`http://localhost:8000/users/${userData.id}`, userData);
      } else {
        await axios.post("http://localhost:8000/users", userData);
      }
      closeModel();
      getAllUsers(); // Refresh users after adding/updating
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };
  
  // Update 
  const handleUpdateRecord = (user) =>{
    setUserData(user);
    setIsModelOpen(true);
  }

  return (
    <>
    <div className="container">
        <h3>CRUD Application with React.js Frontend and Node.js Backend</h3>
        <div className="input-search">
          <input
            type="search"
            placeholder="Search Text Here"
            onChange={handleSearchChange}
          />
          <button className="btn green" onClick={handleAddRecord}>Add Record</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.city}</td>
                  <td>
                    <button className="btn green" onClick={()=>handleUpdateRecord(user)}>Edit</button>
                  </td>
                  <td>
                    <button
                      className="btn red"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isModelOpen && (
        <div className="model">
          <div className="model-content">
            <span className="close" onClick={closeModel}>
              &times;
            </span>
            <h2>User Record</h2>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" name="name" id="name" value={userData.name} onChange={handleData}/>
            </div>
            <div className="input-group">
              <label htmlFor="phonenumber">Phone Number</label>
              <input type="text" name="phonenumber" id="phonenumber" value={userData.phonenumber} onChange={handleData}/>
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" name="city" id="city" value={userData.city} onChange={handleData} />
            </div>
            <button className="btn green" onClick={handleSubmit}>Add Users</button>
          </div>
        </div>
      )}
      </>
  )
}

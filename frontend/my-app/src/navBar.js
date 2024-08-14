// src/NavBar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS for styling

const NavBar = () => {

    const [userType, setUserType] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    setUserType(user.Category)
  }, [])

  const handleLogout = () => {
    // Clear user data and redirect to login page
    localStorage.removeItem('User');
    window.location.href = '/'; // Redirect to login page or another page
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/news">News</Link></li>
        {userType == 'editorial' && <li><Link to="/add-news">Add News</Link></li>}
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;

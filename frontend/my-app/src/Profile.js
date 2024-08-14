// src/Profile.js
import React from 'react';
import NavBar from './navBar';
import './Profile.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('User'));

  if (!user) {
    return <div className="error">User not found. Please sign in again.</div>;
  }

  return (
    //Profile
    <div>
      <NavBar />
      <header style={{ textAlign: 'center' }}>
        <h1>User Profile</h1>
      </header>
      <main className="profile-container">
        <div className="profile-info">
          <h2>{user.Name}</h2>
          <p><strong>Username:</strong> {user.UserName}</p>
          <p><strong>Category:</strong> {user.Category}</p>
        </div>
      </main>
      <footer style={{ textAlign: 'center' }}>
        <p>&copy; 2024 News Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;

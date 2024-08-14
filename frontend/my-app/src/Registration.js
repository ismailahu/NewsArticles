// RegisterPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css'; // Import CSS for styling

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const url = "http://localhost:" + process.env.PORT || 5000 + "/api/auth/signup";
      const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'UserName' : username, 'Password' : password, 'Name' : name, 'Category' : category }),
      });
  
      if (!response.ok) {
        setError(response.statusText);
        throw new Error('Sign Up failed');
      }
  
      const data = await response.json();
  
      // Handle successful response (e.g., store token, redirect user)
      window.alert('Sign Up successful');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSignUp} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="anonymous">Anonymous</option>
            <option value="registered">Registered</option>
            <option value="editorial">Editorial</option>
          </select>
        </div>
        <button id='SignUpBut' type="submit" onClick={handleSignUp} className="signup-button">Sign Up</button>
        {error !== '' && <span style={{fontSize: 14, color: 'red'}}>{error}</span>}
      </form>
      <Link to="/" className="signin-link">Back to Sign In</Link>
    </div>
  );
};

export default RegisterPage;

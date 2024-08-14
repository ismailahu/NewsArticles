// SignInPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignInPage.css'; // Import CSS for styling



const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("User");
    user && navigate("/news")
  })

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signin` || 'http://localhost:4000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'UserName' : username, 'Password' : password }),
      });
  
      if (!response.ok) {
        setError(response.statusText);
        throw new Error('Sign In failed');
      }
  
      const data = await response.json();
      console.log("USER LOG IN DATA : ", data.user._doc)
      localStorage.setItem("User", JSON.stringify(data.user._doc));
  
      // Handle successful response (e.g., store token, redirect user)
      window.alert('Sign In successful');
      navigate('/news');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className="sign-in-form">
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
        <button id='signinBut' type="submit" onClick={handleSignIn} className="sign-in-button">Sign In</button>
        {error !== '' && <span style={{fontSize: 14, color: 'red'}}>{error}</span>}
      </form>
      <Link to="/register" className="register-link">Register</Link>
    </div>
  );
};

export default SignInPage;

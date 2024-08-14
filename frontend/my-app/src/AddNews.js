// src/AddNews.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './navBar';
import './AddNews.css';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState('Entertainment');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    user.Category != 'editorial' && navigate('/news')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    

    try {

      const url = "https://newsarticle-bdbcd6637463.herokuapp.com/api/news/addNews";

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 123`
        },
        body: JSON.stringify({
          Title: title,
          Detail: detail,
          CategoryName: category,
          UserName: JSON.parse(localStorage.getItem('User')).UserName
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add news');
      }

      window.alert('News added successfully');
      navigate('/news');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <NavBar />
      <header style={{ textAlign: 'center' }}>
        <h1>Add News</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="add-news-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="detail">Description:</label>
            <textarea
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="LifeStyle">LifeStyle</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Add News</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </main>
      <footer style={{ textAlign: 'center' }}>
        <p>&copy; 2024 News Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AddNews;

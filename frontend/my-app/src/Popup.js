// src/Popup.js
import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ isOpen, onClose, title, detail, username, category }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDetail, setNewDetail] = useState(detail);
  const [newCategory, setNewCategory] = useState(category);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));
    if (user) {
      setUserType(user.Category);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    //`${process.env.REACT_APP_API_URL}

    try {
      const url = "http://localhost:" + process.env.PORT || 5000 + "/api/news/editNews";
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldTitle: title,
          newTitle,
          newDetail,
          newCategory
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update news');
      }

      // Successfully updated, close the popup
      onClose();
      // Optionally, refresh the news list or handle any additional UI updates
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    userType == 'editorial' ?
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>X</button>
        <h2>Edit News</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="newTitle">Title</label>
            <input
              type="text"
              id="newTitle"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newDetail">Detail</label>
            <textarea
              id="newDetail"
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newCategory">Category</label>
            <select
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            >
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="LifeStyle">LifeStyle</option>
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Update</button>
        </form>
      </div>
    </div> : <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p><strong>Description:</strong> {detail}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Category:</strong> {category}</p>
        <button onClick={onClose} className="popup-close-button">Close</button>
      </div>
    </div>
  );
};

export default Popup;

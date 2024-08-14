// src/NewsItem.js
import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import './newsItem.css';

const NewsItem = ({ category, title, detail, username }) => {
  const [userType, setUserType] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));
    if (user) {
      setUserType(user.Category);
    }
  }, []);

  const handleClick = () => {
    if (userType !== 'anonymous') {
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="news-item" onClick={handleClick}>
        <h2 className="news-title">{title}</h2>
        <p className="news-category">{category}</p>
      </div>
      <Popup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        title={title}
        detail={detail}
        username={username}
        category={category}
      />
    </>
  );
};

export default NewsItem;

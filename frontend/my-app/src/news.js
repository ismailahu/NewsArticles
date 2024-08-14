import React, { useState, useEffect } from 'react';
import NewsItem from './newsItem';
import NavBar from './navBar';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = () => {
      ('WebSocket connected');
    };

    websocket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      if (type === 'new') {
        setNews((prevNews) => [data, ...prevNews]);
      } else if (type === 'update') {
        setNews((prevNews) => 
          prevNews.map((item) =>
            item.Title === data.Title ? data : item
          )
        );
      } else if (type === 'delete') {
        setNews((prevNews) =>
          prevNews.filter((item) => item.Title !== data.Title)
        );
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError(error);
    };

    websocket.onclose = () => {
      ('WebSocket disconnected');
    };

    return () => {
      websocket.close();
    };
  }, []);

  ////`${process.env.REACT_APP_API_URL}/api/auth/signup`

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/news` || 'http://localhost:4000/api/news');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

//   if (error) {
//     return <div className="error">Error: {error.message}</div>;
//   }

  return (
    <div className="app">
      <NavBar />
      <header style={{ textAlign: 'center' }}>
        <h1>News Headlines</h1>
      </header>
      <main>
        <div className="news-container">
          {news.length > 0 ? (
            news.map((item) => (
              <NewsItem
                key={item.Title}
                category={item.CategoryName}
                title={item.Title}
                detail={item.Detail}
                username={item.UserName}
              />
            ))
          ) : (
            <p>No news available.</p>
          )}
        </div>
      </main>
      <footer style={{ textAlign: 'center' }}>
        <p>&copy; 2024 News Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default News;

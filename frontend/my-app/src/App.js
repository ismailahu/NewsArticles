// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './SignIn';
import RegisterPage from './Registration';
import AddNews from './AddNews';
import News from './news';
import Profile from './Profile';
import AuthGuard from './AuthGuard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/add-news" 
            element={
              <AuthGuard>
                <AddNews />
              </AuthGuard>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            } 
          />
          <Route 
            path="/news" 
            element={
              <AuthGuard>
                <News />
              </AuthGuard>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

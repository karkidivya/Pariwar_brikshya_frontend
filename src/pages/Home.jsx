import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Family Tree</h1>
        <p>Discover, preserve, and share your family history</p>
        <p style={{ fontSize: '16px', color: '#888', marginBottom: '30px' }}>
          Create your family tree, add members, and visualize relationships
        </p>
        <div className="cta-buttons">
          {user ? (
            <Link to="/dashboard" className="btn">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
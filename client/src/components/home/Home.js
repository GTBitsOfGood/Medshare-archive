import React from 'react';
import SearchBar from '../search/SearchBar';

const Home = () => {
  return (
    <div>
      <div className="title">
        <h1>Medshare</h1>
      </div>
      <div className="bar" />
      <SearchBar />
    </div>
  )
};

export default Home;
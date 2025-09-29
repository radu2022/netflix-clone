import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className={`search-container ${isActive ? "active" : ""}`}>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies, shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setIsActive(false)}
      />
      <button className="search-icon" onClick={() => setIsActive(!isActive)}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;

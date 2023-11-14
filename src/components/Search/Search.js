import React, { useState } from "react";
import "./Search.css";

const Search = ({ onSearch = (f) => f, initialUrl }) => {
  const [searchUrl, setSearchUrl] = useState("");
  const search = async () => {
    onSearch(searchUrl);
  };
  return (
    <div className="search">
      <input
        type="text"
        onChange={(e) => {
          setSearchUrl(initialUrl + e.target.value);
        }}
      />
      <button className="search-btn" onClick={search}>
        検索
      </button>
    </div>
  );
};

export default Search;

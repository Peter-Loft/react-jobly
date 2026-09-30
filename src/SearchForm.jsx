import React, { useState } from "react";

function SearchForm({ handleSubmit, label = "Search" }) {
  const [searchTerm, setSearchTerm] = useState("");

  function submitSearch(event) {
    event.preventDefault();
    handleSubmit(searchTerm);
  }

  return (
    <form onSubmit={submitSearch} role="search" className="SearchForm">
      <label htmlFor="searchBar">{label}</label>
      <input type="search" id="searchBar" name="searchBar"
        value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;

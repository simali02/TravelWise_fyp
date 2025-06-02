import React, { useEffect, useState } from 'react';
import '../assets/css/SearchBarStyles.css'
import { GrSearch } from 'react-icons/gr';
const SearchBar = ({query, setQuery, handleSearch, items, filters }) => {
  useEffect(() => {
    if (filters?.sort_by !== "recommendations"){
      setQuery("")
    }
  }, [filters])
  return (
            <div className="search-bar listing-search-bar">
                <input type="text" placeholder='Search on the go...' name='search' value={query}  onChange={(e) => setQuery(e.target.value)}/>
                <button onClick={handleSearch} disabled={!query || items.isFetching || filters?.sort_by !== "recommendations"} className='parkinsans-m-text primary-btn'><GrSearch/>{filters?.sort_by !== "recommendations" ? "Switch to Recommendations":"Search"}</button>
                </div>  
            )
}

export default SearchBar
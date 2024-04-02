import React, { useState } from 'react';

function SearchExpense({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    handleSearch(term); // Pass the search term to the parent component's handleSearch function
  };

  return (
    <div className="search-expense">
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchExpense;

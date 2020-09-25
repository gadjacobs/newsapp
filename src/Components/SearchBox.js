import React from 'react';

const SearchBox = ({handleKeyDown }) => {
    return (
        <input
        type="search"
        className="pa3 ba w-60 h3 br3"
        placeholder="Enter a search term"
        onKeyDown={handleKeyDown}
      />
    );
}

export default SearchBox;
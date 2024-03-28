import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className='inline-block p-2' onSubmit={handleSubmit}>
      <input
        className='bg-white rounded-lg border-4 border-gray-300 text-black '
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        className='px-4 ml-4 bg-gray-700 rounded-lg border-4 border-white hover:bg-gray-500 hover:text-gray-900'
        type='submit'
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

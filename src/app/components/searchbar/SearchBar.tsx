// To handle the search logic, I can only go through 100 characters ata time
// I think I am going to need to run through each character name and see if they contain pieces of the search filter
// if they do, I will need to store it in state
//  I will need to make repeated calls to the API, this will be timely
//  I could start by searching through what has already been loaded on state which may optimize a little bit, but not much
//
// Build a cache using Redis, of all the pertenant data at night, make it a rolling cache so there is never any down time.
// This will improve the speed tremendously
// Doing this will remove the need from calling the API directly to saturate the page, and make search queries

import React, { useState } from 'react';
import { SearchBarProps } from '@/app/types/interface';

// interface SearchBarProps {
//   onSearch: (searchTerm: string) => void;
// }

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

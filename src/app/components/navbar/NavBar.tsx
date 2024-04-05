'use client';

import SearchBar from '../searchbar/SearchBar';
import SignOut from '../button/SignOut';

// Currently there is pseudo functionality in the sign out, and the search bar is non functioning, need to sort out the logic

const NavBar = () => {
  return (
    <div className='border-green-400 border-4 rounded-xl flex flex-row items-center'>
      <SearchBar
        onSearch={function (searchTerm: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SignOut />
    </div>
  );
};

export default NavBar;

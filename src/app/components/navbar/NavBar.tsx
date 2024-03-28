'use client';

// Will consist of Search Bar and Sign out button
import SearchBar from '../searchbar/SearchBar';
import SignOut from '../button/SignOut';

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

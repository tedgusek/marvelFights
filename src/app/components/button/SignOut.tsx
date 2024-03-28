import React from 'react';
import Link from 'next/link';

// For now this links to the Home Page, eventually will clear user authentication

const SignOut: React.FC = () => {
  return (
    <div>
      <Link
        className=' py-0.5 px-4 mx-4 bg-gray-700 rounded-lg border-4 border-white hover:bg-gray-500 hover:text-gray-900'
        href='/'
      >
        Signout
      </Link>
    </div>
  );
};

export default SignOut;

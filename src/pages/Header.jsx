import React, { useState, useEffect } from 'react';
import { BsPersonCircle, BsJustify } from 'react-icons/bs';
import AuthService from '../Auth/AuthService';

function Header({ OpenSidebar }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <header className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div className='flex items-center'>
        <BsJustify className='text-2xl cursor-pointer' onClick={OpenSidebar} />
      </div>
      <div className='flex items-center'>
        <BsPersonCircle className='text-2xl mr-3' />
        <h2 className='text-lg'>Welcome {currentUser ? currentUser.fullName : 'Guest'}</h2>
      </div>
    </header>
  );
}

export default Header;

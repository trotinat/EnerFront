import React, { useState, useEffect } from 'react';
import { BsPersonCircle, BsJustify } from 'react-icons/bs';
import AuthService from '../Auth/AuthService'; 

function Header({ OpenSidebar }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Assume AuthService.getCurrentUser() returns the current user data
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <header className='headerr'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-right'>
        <BsPersonCircle className='icon' />
      </div>
      <div className='header-right'>
        <h2>Welcome {currentUser ? currentUser.fullName : 'Guest'}</h2>
      </div>
    </header>
  );
}

export default Header;

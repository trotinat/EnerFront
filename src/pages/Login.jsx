import React, { useState } from 'react';
import AuthService from '../Auth/AuthService'; // Replace with the correct path to AuthService
import axios from 'axios';

export const LoginSignup = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const isAuthenticated = await AuthService.login(email, password);
    if (isAuthenticated) {
      window.location.replace(window.location.origin + '/');
    } else {
      console.error('Login failed. Invalid credentials.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8888/CLIENT-SERVICE/api/client', {
        fullName: name,
        email: email,
        password: password,
      });

      console.log('Registration successful:', response.data);
      setLoginMode(true); // After registration, switch to login mode
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  return (
    <div className='container'>
      <div className='enerdrive'></div>
      <div className='left-container'>
        <div className='header'>
          <div className='text'>
            WELCOME TO ENER<span className='span'>DRIVE</span>
          </div>
          <div className='text1'>
            {loginMode ? "You don't have an account? Sign up now" : 'Already have an account? Login now'}
          </div>
          <div className='underline' onClick={() => setLoginMode(!loginMode)}>
            {loginMode ? 'Sign up now' : 'Login now'}
          </div>
        </div>
        {loginMode ? (
          // Login inputs
          <>
            <div className='inputs'>
              <h3 className='label'>Email</h3>
              <div className='input'>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className='inputs'>
              <h3 className='label'>Password</h3>
              <div className='input'>
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className='submit-container'>
              <div className='submit' onClick={handleLogin}>
                Login
              </div>
            </div>
          </>
        ) : (
          // Registration inputs
          <>
            <div className='inputs'>
              <h3 className='label'>Name</h3>
              <div className='input'>
                <input type='text' onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className='inputs'>
              <h3 className='label'>Email</h3>
              <div className='input'>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className='inputs'>
              <h3 className='label'>Password</h3>
              <div className='input'>
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className='submit-container'>
              <div className='submit' onClick={handleRegister}>
                Register
              </div>
            </div>
          </>
        )}
      </div>
      <div className='right-container'></div>
    </div>
  );
};

export default LoginSignup;

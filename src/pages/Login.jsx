import React, { useState } from 'react';
import AuthService from '../Auth/AuthService'; // Replace with the correct path to AuthService
import axios from 'axios';

const LoginSignup = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Added error state

  const handleLogin = async () => {
    try {
      const isAuthenticated = await AuthService.login(email, password);
      if (isAuthenticated) {
        window.location.replace(window.location.origin + '/');
      } else {
        setError('Login failed. Invalid credentials.');
      }
    } catch (error) {
      setError('Login failed. An error occurred.');
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
      setError('Registration failed. An error occurred.');
    }
  };

  return (
    <div className="container flex h-screen">
      <div className="m-auto max-w-md w-full">
        <h1 className="text-3xl text-center mb-6">Welcome to ENERDRIVE</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
        <p className="text-center text-gray-600 mb-4">
          {loginMode ? "You don't have an account? Sign up now" : 'Already have an account? Login now'}
        </p>
        <div className="text-center mb-4 cursor-pointer text-blue-500" onClick={() => setLoginMode(!loginMode)}>
          {loginMode ? 'Sign up now' : 'Login now'}
        </div>
        {loginMode ? (
          // Login inputs
          <>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md" onClick={handleLogin}>
              Login
            </button>
          </>
        ) : (
          // Registration inputs
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md" onClick={handleRegister}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;

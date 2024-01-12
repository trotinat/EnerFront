// AuthService.js

class AuthService {
    static async login(email, password) {
      try {
        const usersResponse = await fetch('http://localhost:8888/CLIENT-SERVICE/api/client');
        
        if (!usersResponse.ok) {
          console.error('Failed to fetch users:', usersResponse.status, usersResponse.statusText);
          return false;
        }
  
        const allUsers = await usersResponse.json();
        
        const user = allUsers.find(u => u.email === email && u.password === password);
  
        if (user) {
          // Successful login
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        } else {
          // Failed login
          console.error('Login failed. Invalid credentials.');
          return false;
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Login failed. An error occurred:', error);
        return false;
      }
    }
  
    static logout() {
      localStorage.removeItem('user');
    }
  
    static getCurrentUser() {
      const userJson = localStorage.getItem('user');
  
      if (userJson) {
        return JSON.parse(userJson);
      }
  
      return null;
    }
  }
  
  export default AuthService;
  
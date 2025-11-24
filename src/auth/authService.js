// src/auth/authService.js

const login = async (username, password) => {
  // In a real application, you would make an API call to your backend
  // For this example, we'll simulate a successful login
  if (username === 'admin' && password === 'password') {
    // Simulate a JWT token
    const token = 'fake-jwt-token';
    localStorage.setItem('token', token);
    return { success: true, token };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

const authService = {
  login,
  logout,
  isAuthenticated,
};

export default authService;

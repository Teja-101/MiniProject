import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(decoded));
    navigate('/generate');
  };

  const handleError = () => {
    alert('Login Failed');
  };

  return (
    <div className="login-container">
        <h1 className="app-title">React Visions: API-Powered Photo Generation</h1>
      <h2>Login with Google to Continue</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default LoginPage;

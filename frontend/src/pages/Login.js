import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="signup">
      <h1>Blog City</h1>
      <div className="info">
        <form>
          <div className="credits">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={isLoading} onClick={handleSubmit}>
              Login
            </button>
            {error && <div className="error">{error}</div>}
          </div>
          <p className="option">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
      <div className="credentials">
        <p>To test</p>
        <p>test@gmail.com</p>
        <p>Password@123</p>
      </div>
    </div>
  );
};

export default Login;

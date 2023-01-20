import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  return (
    <div className="signup">
      <h1>Blog City</h1>
      <form>
        <div className="credits">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Sign Up
          </button>
          {error && <div className="error">{error}</div>}
        </div>
        <p className="option">
          Already have an account. <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

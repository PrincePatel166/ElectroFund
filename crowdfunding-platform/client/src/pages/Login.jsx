// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App.jsx'; // assumes AuthContext is defined & exported in App.jsx

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();             // pull in the login action from context
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Save the token and update global auth state
      localStorage.setItem('token', res.data.token);
      login();

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-black py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white">
              Electro<span className="text-yellow-500">Fund</span>
            </h1>
          </Link>
          <div className="space-x-2">
            <Link to="/dashboard">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                Dashboard
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-yellow-500 py-3">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center">
            <li>
              <Link to="/" className="text-black font-medium hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black font-medium hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/create" className="text-black font-medium hover:text-white transition">
                Start Campaign
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-black font-medium hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Login Form */}
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Login to ElectroFund</h2>
            <p className="text-gray-600 text-center mb-8">
              Enter your credentials to access your account
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md font-medium transition ${
                  loading
                    ? 'bg-yellow-300 cursor-not-allowed text-gray-600'
                    : 'bg-yellow-500 text-black hover:bg-yellow-600'
                }`}
              >
                {loading ? 'Signing In…' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don’t have an account?{' '}
                <Link to="/register" className="text-yellow-600 hover:text-yellow-800 font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ElectroFund. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;

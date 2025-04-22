import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });

      console.log('Registration successful:', res.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-black py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white">Electro<span className="text-yellow-500">Fund</span></h1>
          </Link>
          <div className="space-x-2">
            <Link to="/dashboard">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">Dashboard</button>
            </Link>
            <Link to="/login">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">Login</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-yellow-500 py-3">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center">
            <li><Link to="/" className="text-black font-medium hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="text-black font-medium hover:text-white transition">About</Link></li>
            <li><Link to="/create" className="text-black font-medium hover:text-white transition">Start Campaign</Link></li>
            <li><Link to="/register" className="text-black font-medium hover:text-white transition">Register</Link></li>
            <li><Link to="/contact" className="text-black font-medium hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>
      </nav>

      {/* Register Form */}
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
            <p className="text-gray-600 text-center mb-8">Join ElectroFund to create or support electronic innovation campaigns</p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="********"
                />
                <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="********"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <Link to="/terms" className="text-yellow-600 hover:text-yellow-800">Terms of Service</Link> and <Link to="/privacy" className="text-yellow-600 hover:text-yellow-800">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-3 rounded-md font-medium hover:bg-yellow-600 transition"
              >
                Create Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-yellow-600 hover:text-yellow-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 ElectroFund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;

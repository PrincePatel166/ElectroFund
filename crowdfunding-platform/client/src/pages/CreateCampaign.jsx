import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateCampaign = ({ isLoggedIn }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    startupURL: '',
    spotlight: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/campaigns', formData);
      setSuccessMessage('🎉 Campaign created successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error('Error creating campaign:', err);
      setErrorMessage('❌ Failed to create campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl font-semibold text-gray-700 mb-4">Please log in to access this page.</p>
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-black py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white">Electro<span className="text-yellow-500">Fund</span></h1>
          </Link>
          <div className="space-x-2">
            <Link to="/dashboard"><button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600">Dashboard</button></Link>
            {/* <Link to="/login"><button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600">Login</button></Link> */}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-yellow-500 py-3">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center">
            <li><Link to="/" className="text-black font-medium hover:text-white">Home</Link></li>
            <li><Link to="/about" className="text-black font-medium hover:text-white">About</Link></li>
            <li><Link to="/create" className="text-black font-medium hover:text-white">Start Campaign</Link></li>
            <li><Link to="/register" className="text-black font-medium hover:text-white">Register</Link></li>
            <li><Link to="/contact" className="text-black font-medium hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
      </nav>

      {/* Page Title */}
      <div className="bg-black py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center">Create New Campaign</h2>
          <p className="text-gray-400 text-center mt-2">Launch your tech project and find investors</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
              {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

              <div>
                <label className="block mb-1 font-medium text-gray-700">Campaign Title</label>
                <input type="text" name="title" required placeholder="Enter campaign title" value={formData.title} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Description</label>
                <textarea name="description" rows={4} required placeholder="Describe your campaign"
                  value={formData.description} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Goal Amount (₹)</label>
                <input type="number" name="goalAmount" required placeholder="e.g., 50000"
                  value={formData.goalAmount} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Startup Website URL</label>
                <input type="url" name="startupURL" required placeholder="https://yourstartup.com"
                  value={formData.startupURL} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Company Spotlight</label>
                <textarea name="spotlight" rows={3} placeholder="Highlight your previous funding rounds or milestones"
                  value={formData.spotlight} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>

              <button type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-black py-3 rounded font-bold hover:bg-yellow-600 transition">
                {loading ? 'Creating...' : 'Create Campaign'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 ElectroFund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateCampaign;

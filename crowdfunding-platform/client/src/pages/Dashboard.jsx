// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = ({ isLoggedIn }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/campaigns')
      .then(res => setCampaigns(res.data))
      .catch(err => console.error('Error fetching campaigns:', err));
  }, []);

  // Totals for stats
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0);
  const totalGoal = campaigns.reduce((sum, c) => sum + (c.goalAmount || 0), 0);
  const goalProgress = totalGoal
    ? Math.round((totalRaised / totalGoal) * 100)
    : 0;
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
            <h1 className="text-2xl font-bold text-white">
              Electro<span className="text-yellow-500">Fund</span>
            </h1>
          </Link>
          <div className="space-x-2">
            <Link to="/create">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                Start Campaign
              </button>
            </Link>
            {/* <Link to="/login">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                Login
              </button>
            </Link> */}
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
              <Link to="/dashboard" className="text-black font-medium hover:text-white transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-black font-medium hover:text-white transition">
                Register
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

      {/* Dashboard Header */}
      <div className="bg-black py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">My Dashboard</h2>
          <p className="text-gray-400 mt-2">Manage your campaigns and investments</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-gray-500 mb-1">Total Campaigns</h3>
              <p className="text-3xl font-bold">{campaigns.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-gray-500 mb-1">Total Raised</h3>
              <p className="text-3xl font-bold">₹{totalRaised}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-gray-500 mb-1">Goal Progress</h3>
              <p className="text-3xl font-bold">{goalProgress}%</p>
            </div>
          </div>

          {/* My Campaigns */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">My Campaigns</h3>
              <Link
                to="/create"
                className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-600 transition"
              >
                Create New
              </Link>
            </div>

            {campaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map(c => (
                  <div
                    key={c._id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Using the startupURL instead of image */}
                    <div className="w-full h-40 bg-gray-200">
                      <a href={c.startupURL} target="_blank" rel="noopener noreferrer">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${c.startupURL}`}
                          alt={c.title}
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold mb-2">{c.title}</h4>
                      <div className="flex justify-between text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Goal</p>
                          <p className="font-medium">₹{c.goalAmount}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Raised</p>
                          <p className="font-medium">₹{c.raisedAmount || 0}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round(((c.raisedAmount || 0) / c.goalAmount) * 100)
                              )}%`
                            }}
                          ></div>
                        </div>
                        <p className="text-right text-sm mt-1">
                          {Math.round(((c.raisedAmount || 0) / c.goalAmount) * 100)}% funded
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <Link
                          to={`/campaign/${c._id}`}
                          className="text-blue-600 hover:text-blue-800 transition font-medium"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/edit/${c._id}`}
                          className="text-gray-600 hover:text-gray-800 transition font-medium"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">You haven't created any campaigns yet.</p>
                <Link
                  to="/create"
                  className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-600 transition"
                >
                  Create Your First Campaign
                </Link>
              </div>
            )}
          </div>

          {/* Investments Section (placeholder)
          <div className="bg-white p-6 rounded-lg shadow-md mt-10">
            <h3 className="text-2xl font-bold mb-6">My Investments</h3>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">All investements in any campaigns </p>
              <Link
                to="/"
                className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-600 transition"
              >
                Explore Campaigns
              </Link>
            </div>
          </div> */}

         {/* Activity Log */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-10">
            <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {campaigns.length > 0 ? (
                campaigns.map(c => (
                  <div key={c._id} className="flex items-center py-3 border-b border-gray-100">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-600">📊</span>
                    </div>
                    <div>
                      <p className="font-medium">Campaign Created: {c.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(c.createdAt).toLocaleDateString()} - Goal: ₹{c.goalAmount}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent activity to display.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} ElectroFund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

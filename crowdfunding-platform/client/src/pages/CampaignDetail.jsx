import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CampaignDetail = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [investing, setInvesting] = useState(false);
  const [error, setError] = useState('');

  // Fetch campaign
  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
        setCampaign(res.data);
      } catch (err) {
        console.error('Error loading campaign:', err);
        setError('Failed to load campaign.');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  // Handle investing
  const handleInvestment = async () => {
    if (!investmentAmount || isNaN(investmentAmount) || Number(investmentAmount) <= 0) {
      alert('Please enter a valid investment amount.');
      return;
    }

    setInvesting(true);
    try {
      await axios.post(`http://localhost:5000/api/campaigns/${id}/invest`, {
        amount: Number(investmentAmount),
      });
      setInvestmentAmount('');
      const res = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
      setCampaign(res.data);
      alert('Thanks for investing! 🚀');
    } catch (err) {
      console.error('Error during investment:', err);
      alert('Investment failed. Try again.');
    } finally {
      setInvesting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="bg-black text-white py-10 text-center">
        <div className="container mx-auto animate-pulse">
          <div className="h-8 w-1/3 mx-auto bg-yellow-500 rounded mb-4" />
          <div className="h-4 w-1/2 mx-auto bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 py-10 text-center">
        <p>{error}</p>
      </div>
    );
  }
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
            <Link to="/dashboard">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                Dashboard
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Campaign Banner */}
      <div className="bg-black py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center">{campaign.title}</h2>
          <p className="text-gray-400 text-center mt-2">Innovative tech project seeking funding</p>
        </div>
      </div>

      {/* Campaign Details & Investment */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Description & Spotlight */}
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold mb-2">About This Project</h3>
              <p className="text-gray-700">{campaign.description}</p>

              {campaign.spotlight && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h4 className="font-semibold text-yellow-600 mb-1">Spotlight</h4>
                  <p className="text-gray-800 italic">{campaign.spotlight}</p>
                </div>
              )}

              {campaign.startupURL && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-2">Startup Website</h3>
                  <a
                    href={campaign.startupURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 text-black px-4 py-2 rounded inline-flex items-center hover:bg-gray-300 transition"
                  >
                    <span className="mr-2">🌐</span> Visit Website
                  </a>
                </div>
              )}
            </div>

            {/* Right: Funding Status & Invest */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-center">Funding Status</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Target Goal</p>
                  <p className="text-xl font-bold">₹{campaign.goalAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Raised</p>
                  <p className="text-xl font-bold text-green-600">₹{campaign.raisedAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Investors</p>
                  <p className="text-xl font-bold">{campaign.investors.length}</p>
                </div>
              </div>
              <div className="border-t border-gray-300 pt-6">
                <h4 className="font-bold text-center mb-4">Support This Campaign</h4>
                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder="Enter amount (₹)"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  />
                  <button
                    onClick={handleInvestment}
                    disabled={investing}
                    className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition disabled:bg-gray-400"
                  >
                    {investing ? 'Investing...' : 'Invest Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;

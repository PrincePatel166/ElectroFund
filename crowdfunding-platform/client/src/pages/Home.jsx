import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/campaigns')
      .then(res => setCampaigns(res.data))
      .catch(err => console.error('Error fetching campaigns:', err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-black py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Electro<span className="text-yellow-500">Fund</span>
          </h1>
          <div className="space-x-2">
            <Link to="/dashboard">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                Dashboard
              </button>
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                  Login
                </button>
              </Link>
            )}
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

      {/* Hero Banner */}
      <div className="relative bg-[url('https://source.unsplash.com/1600x900/?technology,electronic')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              Launch Your <span className="text-yellow-500">Tech Startup</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Fund your innovation with our crowdfunding platform specialized for electronics and tech startups.
            </p>
            <Link to="/create">
              <button className="bg-yellow-500 text-black px-6 py-3 font-bold rounded-full hover:bg-yellow-600 transition">
                Start Your Campaign
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ElectroFund?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature icon="🚀" title="Quick Launch" text="Start your campaign in minutes and reach potential investors worldwide." />
            <Feature icon="💰" title="Flexible Funding" text="Get the funds you need with our investor-friendly platform." />
            <Feature icon="🔒" title="Secure Process" text="Our platform ensures safe transactions for both creators and investors." />
          </div>
        </div>
      </div>

      {/* Campaigns */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Campaigns</h2>
          <p className="text-center text-gray-600 mb-12">Discover innovative projects looking for funding</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">
                No campaigns found. Be the first to create one!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your Project?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our platform today and connect with investors who believe in innovation.
          </p>
          <Link to="/create">
            <button className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition">
              Create Campaign
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">ElectroFund</h3>
              <p className="text-gray-400">Empowering tech innovation through crowdfunding.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <FooterLinks title="Quick Links" links={['/', '/about', '/create']} labels={['Home', 'About', 'Start Campaign']} />
              <FooterLinks title="Resources" links={['/faq', '/terms', '/privacy']} labels={['FAQ', 'Terms', 'Privacy']} />
              <div>
                <h4 className="font-bold mb-2">Contact</h4>
                <ul className="space-y-1">
                  <li className="text-gray-400">info@electrofund.com</li>
                  <li className="text-gray-400">+91 123 456 7890</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; 2025 ElectroFund. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, text }) => (
  <div className="bg-white p-6 rounded shadow-md text-center">
    <div className="bg-yellow-500 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

const CampaignCard = ({ campaign }) => (
  <div className="border border-gray-200 rounded overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="h-48 flex items-center justify-center bg-gray-200">
      <a href={campaign.startupURL} target="_blank" rel="noopener noreferrer">
        <img
          src={`https://www.google.com/s2/favicons?domain=${campaign.startupURL}`}
          alt={`${campaign.title} logo`}
          className="w-16 h-16 object-contain"
        />
      </a>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-3">{campaign.description}</p>
      {/* Spotlight field */}
      {campaign.spotlight && (
        <p className="text-gray-500 italic text-sm mb-4 line-clamp-2">
          {campaign.spotlight}
        </p>
      )}
      <div className="flex justify-between text-sm mb-4">
        <div>
          <p className="font-bold text-gray-700">Goal:</p>
          <p className="text-gray-600">₹{campaign.goalAmount}</p>
        </div>
        <div>
          <p className="font-bold text-gray-700">Raised:</p>
          <p className="text-gray-600">₹{campaign.raisedAmount || 0}</p>
        </div>
      </div>
      <Link
        to={`/campaign/${campaign._id}`}
        className="bg-yellow-500 text-black text-sm font-bold px-4 py-2 inline-block rounded hover:bg-yellow-600 transition"
      >
        View Details
      </Link>
    </div>
  </div>
);

const FooterLinks = ({ title, links, labels }) => (
  <div>
    <h4 className="font-bold mb-2">{title}</h4>
    <ul className="space-y-1">
      {links.map((link, index) => (
        <li key={link}>
          <Link to={link} className="text-gray-400 hover:text-white transition">
            {labels[index]}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Home;

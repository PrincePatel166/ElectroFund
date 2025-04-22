import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-black py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white">Electro<span className="text-yellow-500">Fund</span></h1>
          </Link>
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

      {/* About Content */}
    <div className="bg-gray-100 py-16 min-h-screen">
    <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">About ElectroFund</h2>
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
        ElectroFund is a dynamic crowdfunding platform designed to support startups and innovators in the electronics domain. 
        Whether you're launching a hardware product, developing a smart device, or working on breakthrough tech, ElectroFund helps bring your vision to life.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
        Users can create personalized campaigns, showcase their ideas, and raise funds from a community of passionate backers. Our platform bridges the gap between creators and supporters, making it easier for electronics-based startups to get the financial boost they need.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
        At ElectroFund, we believe in innovation, collaboration, and empowering creators. Join us today and launch your startup campaign to turn your ideas into impactful real-world solutions.
        </p>
     </div>
    </div>
    </div>
  );
};

export default About;

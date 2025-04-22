import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: '', email: '', message: '' });
  };

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

      {/* Contact Content */}
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-3 rounded-md font-medium hover:bg-yellow-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

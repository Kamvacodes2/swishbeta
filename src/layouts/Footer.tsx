// src/layouts/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto text-center text-sm">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          <Link to="/about" className="hover:text-green-500">About Us</Link>
          <Link to="/privacy" className="hover:text-green-500">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-green-500">Terms of Service</Link>
          <Link to="/contact" className="hover:text-green-500">Contact</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} SWISH. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

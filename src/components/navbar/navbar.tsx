import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-6 py-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-semibold">
          RESEDA PHOTOGRAPHY
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8">
          <Link href="/services" className="hover:text-gray-600">
            SERVICES
          </Link>
          <Link href="/gallery" className="hover:text-gray-600">
            GALLERY
          </Link>
          <Link href="/information" className="hover:text-gray-600">
            INFORMATION
          </Link>
          <Link href="/schedule" className="hover:text-gray-600">
            SCHEDULE A SHOOT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-6 py-4 border-b-2 border-gray-700 bg-[#eae6df]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-semibold text-[#d37354]">
          CUSEHACKS
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8">
          <Link href="/services" className="text-black hover:text-gray-600">
            PAGE 1
          </Link>
          <Link href="/gallery" className="text-black hover:text-gray-600">
            PAGE 2
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

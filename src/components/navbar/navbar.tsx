import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-6 py-4 border-b-2 border-[#eae6df] bg-[#eae6df]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="text-2xl font-semibold text-[#d37354] tracking-[.25em]">
            CusePULSE 
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


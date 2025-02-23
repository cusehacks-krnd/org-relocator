import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#eae6df] p-8">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-6xl font-bold mb-4">
          AI <span className="underline">research</span> and<br />
          <span className="underline">products</span> that put<br />
          safety at the frontier
        </h1>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Claude Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="uppercase text-sm font-semibold text-gray-600 mb-4">
              CLAUDE.AI
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Meet Claude 3.5 Sonnet
            </h2>
            <p className="text-gray-600 mb-8">
              Claude 3.5 Sonnet, our most intelligent AI model, is now available.
            </p>
            <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition">
              Talk to Claude
            </button>
          </div>

          {/* API Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="uppercase text-sm font-semibold text-gray-600 mb-4">
              API
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Build with Claude
            </h2>
            <p className="text-gray-600 mb-8">
              Create AI-powered applications and custom experiences using Claude.
            </p>
            <button className="w-full border-2 border-black text-black py-3 rounded-full hover:bg-gray-100 transition">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


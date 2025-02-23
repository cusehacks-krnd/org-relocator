import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#eae6df] p-8">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-6xl font-bold mb-4 tracking-[.1em]">
          <span className="underline">Optimizing</span> city<br />
          services through<br />
          <span className="underline">data-driven</span> relocation
        </h1>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* First Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="uppercase text-sm font-semibold text-gray-600 mb-4 tracking-[.15em]">
              SERVICE MAPPING
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-wide">
              Visualize &nbsp;Service &nbsp;Requests
            </h2>
            <p className="text-gray-600 mb-8">
              Explore the distribution of citizen service requests across Syracuse to identify high-demand areas.
            </p>
            <Link href="/graph2" className="block">
              <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition">
                View Map
              </button>
            </Link>
          </div>

          {/* Second Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="uppercase text-sm font-semibold text-gray-600 mb-4 tracking-wider">
              OUR &nbsp;PRESENTATION
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-wide">
              View &nbsp;Our &nbsp;Findings
            </h2>
            <p className="text-gray-600 mb-8">
              Learn about the interesting insights we gleaned from our interactive data visualizer. 
            </p>
            <Link 
              href="https://sumailsyr-my.sharepoint.com/:p:/r/personal/dprestam_syr_edu/_layouts/15/doc2.aspx?sourcedoc=%7BFCEE29F6-E7A9-4A76-B4BA-10FCF9579C18%7D&file=Syracuse%20Pulse.pptx&action=edit&mobileredirect=true&wdOrigin=SEARCHENGINE.GOOGLE%2CAPPHOME-WEB.BANNER.UPLOAD&wdPreviousSession=b903d800-2725-42c4-a56c-34b0e5c397db&wdPreviousSessionSrc=AppHomeWeb&ct=1740332393561"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full border-2 border-black text-black py-3 rounded-full hover:bg-gray-100 transition">
                View Analysis
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


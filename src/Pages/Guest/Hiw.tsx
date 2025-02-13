import React from 'react';

const Hiw = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen white-100 p-8">
      <h1 className="text-3xl font-bold mb-4">How It Works</h1>
      <p className="text-lg text-gray-700 mb-6">
        Here you can  how your platform works...
      </p>

      {/* Video Section */}
      <div className="w-full max-w-4xl">
        <video 
          className="w-full rounded-lg shadow-lg"
          src="/videos/how-it-works.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        />
      </div>
    </div>
  );
};

export default Hiw;

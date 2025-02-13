import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white-200 p-8">
      <div className="flex space-x-8">
        {/* First Panel */}
        <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-[500px]">
          <h1 className="text-3xl font-bold text-center mb-6">Pay as you go Plan</h1>
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">Perfect for individuals or small teams</p>
              <p className="text-lg font-bold mt-4">$50/candidate</p>
              <p className="text-lg mt-4">Includes:</p>
              <ul className="list-disc list-inside text-lg mt-2">
                <li>Set Python, Bash, Nextflow, Javascript, and R challenges</li>
                <li>Real time code execution for candidates</li>
                <li>Read-only code execution for recruiters</li>
                <li>Feedback function for attempts candidates</li>
              </ul>
              <div className="mt-6 text-center">
                <Link
                  to="/auth/register"
                  className="mr-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:px-5 lg:py-2.5"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Panel */}
        <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-[500px]">
          <h1 className="text-3xl font-bold text-center mb-6">Subscription Plan</h1>
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">Great for growing teams</p>
              <p className="text-lg font-italic mt-4">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

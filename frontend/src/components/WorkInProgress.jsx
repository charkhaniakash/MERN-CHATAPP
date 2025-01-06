import React from 'react';
import { Construction } from 'lucide-react';

const WorkInProgress = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md p-8 rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col items-center space-y-6">
          <Construction className="h-16 w-16 text-blue-500 animate-bounce" />
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">Work in Progress</h1>
            <p className="text-lg text-gray-600">
              I am building something awesome for you. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
import { useState } from 'react';

export default function HomePage({ onNavigate }) {
  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-indigo-600 rounded-full mb-6">
              <svg
                className="w-12 h-12 sm:w-14 sm:h-14 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Todo App
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Manage your tasks efficiently with our simple and beautiful todo application
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="text-indigo-600 font-semibold mb-1">Add Tasks</div>
              <p className="text-sm text-gray-600">Create new todos instantly</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-green-600 font-semibold mb-1">Mark Complete</div>
              <p className="text-sm text-gray-600">Track your progress</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-purple-600 font-semibold mb-1">API Integration</div>
              <p className="text-sm text-gray-600">Real-time data sync</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <div className="text-pink-600 font-semibold mb-1">Remove Tasks</div>
              <p className="text-sm text-gray-600">Delete completed items</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onNavigate('todos')}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Get Started →
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-gray-600 text-sm">
          Built with React, Tailwind CSS & JSONPlaceholder API
        </div>
      </div>
    </div>
  );
}

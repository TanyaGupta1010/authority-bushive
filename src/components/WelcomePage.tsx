// src/components/WelcomePage.tsx
import React from 'react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(180deg, #ece6e1 0%, #ffffff 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* White Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-2xl w-full text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
          Authority Portal of
        </h1>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#304159] mb-4">
          Bus Hive
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-700 mb-6">
          Streamlining public transportation management with intelligent routing,
          real-time tracking, and seamless passenger experience.
        </p>

        {/* Button */}
        <button
          onClick={onGetStarted}
          className="px-6 py-3 sm:py-4 rounded-full text-white font-medium transition-transform transform hover:scale-105"
          style={{
            background: 'linear-gradient(90deg, #ece6e1 0%, #b0a18e 100%)',
            borderBottom: '2px solid #4b5563',
          }}
        >
          Get Started &rarr;
        </button>
      </div>
    </div>
  );
};

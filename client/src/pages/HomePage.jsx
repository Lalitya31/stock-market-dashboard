import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, PieChart, BarChart, Target, Shield, Clock } from 'lucide-react';

/**
 * HomePage component - Landing page for the trading application
 */
const HomePage = () => {
  const features = [
    {
      icon: Target,
      title: 'Real-time Data',
      description: 'Access real-time stock prices and market data to make informed trading decisions.',
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Deep dive into portfolio performance with comprehensive analytics and charts.',
    },
    {
      icon: PieChart,
      title: 'Smart Allocation',
      description: 'Optimize your portfolio with smart allocation suggestions based on your risk profile.',
    },
    {
      icon: BarChart,
      title: 'Performance Tracking',
      description: 'Track your gains and losses with detailed performance reports and statistics.',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and trades are protected with enterprise-grade security measures.',
    },
    {
      icon: Clock,
      title: '24/7 Monitoring',
      description: 'Monitor your investments around the clock with our continuous market tracking.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 opacity-10 dark:opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              Master Your <span className="text-blue-600 dark:text-blue-400">Investments</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A powerful trading simulation platform for investors who want to track, analyze, and grow their portfolio with confidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Trading
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Trade
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform provides all the tools you need to track your portfolio, analyze market trends, and execute trades with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                $50M+
              </div>
              <div className="text-blue-200 text-lg">
                Virtual Trading Volume
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                10K+
              </div>
              <div className="text-blue-200 text-lg">
                Active Traders
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                500+
              </div>
              <div className="text-blue-200 text-lg">
                Stocks Available
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                99.9%
              </div>
              <div className="text-blue-200 text-lg">
                Uptime Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who are tracking their portfolios and mastering the markets with our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

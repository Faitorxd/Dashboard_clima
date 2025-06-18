'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatsCard({ title, value, change, changeType = 'neutral', subtitle }) {
  const getChangeIcon = () => {
    if (changeType === 'positive') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (changeType === 'negative') {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') {
      return 'text-green-600';
    } else if (changeType === 'negative') {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between ">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getChangeIcon()}
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    vibration: 0,
    soundLevel: 0,
    waterUsage: 0,
    leakDetected: false,
    lastUpdated: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulation of an API request to fetch sensor data
    const fetchSensorData = async () => {
      const response = await fetch('/api/sensors');
      const data = await response.json();
      setSensorData(data);
      setIsLoading(false);
    };

    fetchSensorData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const waterUsageData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Water Usage (Liters)',
        data: [120, 190, 300, 500, 200, 300, 400],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Liters',
        },
      },
    },
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Water Leak Detection Dashboard</h1>
          <div className="flex items-center">
            <label className="mr-2">Dark Mode</label>
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="mr-4" />
            <button onClick={toggleDarkMode} className="px-4 py-2 bg-blue-500 text-white rounded">
              Toggle Dark Mode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Vibration Level</h2>
            <p className="text-2xl">{sensorData.vibration} Hz</p>
            <p className="text-sm text-gray-500">Last updated: {sensorData.lastUpdated}</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Sound Level</h2>
            <p className="text-2xl">{sensorData.soundLevel} dB</p>
            <p className="text-sm text-gray-500">Last updated: {sensorData.lastUpdated}</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Water Usage</h2>
            <p className="text-2xl">{sensorData.waterUsage} L</p>
            <p className="text-sm text-gray-500">Last updated: {sensorData.lastUpdated}</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md ${sensorData.leakDetected ? 'bg-red-500 text-white' : isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Leak Detection</h2>
            <p className="text-2xl">
              {sensorData.leakDetected ? 'Leak Detected!' : 'No Leak Detected'}
            </p>
            <p className="text-sm">{sensorData.lastUpdated}</p>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Water Usage Over Time</h2>
          <div className="relative w-full h-96"> {/* Adjust height as needed */}
            <Line data={waterUsageData} options={chartOptions} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

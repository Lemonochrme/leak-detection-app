'use client';

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    vibration: 0,
    soundLevel: 0,
    waterUsage: 0,
    leakDetected: false,
    lastUpdated: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation d'une requête API pour récupérer les données des capteurs
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

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Water Leak Detection Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Vibration Level</h2>
            <p className="text-2xl">{sensorData.vibration} Hz</p>
            <p className="text-sm text-gray-500">Last updated: {sensorData.lastUpdated}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sound Level</h2>
            <p className="text-2xl">{sensorData.soundLevel} dB</p>
            <p className="text-sm text-gray-500">Last updated: {sensorData.lastUpdated}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Water Usage</h2>
            <p className="text-2xl">{sensorData.waterUsage} L</p>
            <p className="text-sm text-gray-500">Last updated: {sensorData.lastUpdated}</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md ${sensorData.leakDetected ? 'bg-red-500 text-white' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Leak Detection</h2>
            <p className="text-2xl">
              {sensorData.leakDetected ? 'Leak Detected!' : 'No Leak Detected'}
            </p>
            <p className="text-sm">{sensorData.lastUpdated}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4">Water Usage Over Time</h2>
          <div className="relative w-full h-64 bg-gray-200">
            <p className="text-center py-24">[Graphique d'utilisation d'eau]</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

import { NextResponse } from 'next/server';

const generateDummySensorData = () => {
  const vibration = (Math.random() * 20).toFixed(2); 
  const soundLevel = (Math.random() * 100).toFixed(2); 
  const waterUsage = (Math.random() * 500).toFixed(2);
  const leakDetected = Math.random() < 0.1; 
  const lastUpdated = new Date().toISOString(); 

  return {
    vibration: parseFloat(vibration),
    soundLevel: parseFloat(soundLevel),
    waterUsage: parseFloat(waterUsage),
    leakDetected: leakDetected,
    lastUpdated: lastUpdated,
  };
};

// Handler pour retourner les données
export async function GET() {
  const sensorData = generateDummySensorData();
  return NextResponse.json(sensorData);
}

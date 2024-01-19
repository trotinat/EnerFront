import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFuelPump } from 'react-icons/bs';
import { HiCurrencyDollar } from 'react-icons/hi';
import { FaCar } from 'react-icons/fa';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

function Home() {
  const [fuelConsumptions, setFuelConsumptions] = useState([]);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setClientId(user.id);

          const response = await axios.get(`http://localhost:8888/CONSUMPTION-SERVICE/api/consumption/client/${user.id}`);

          if (response && response.data) {
            setFuelConsumptions(response.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data or fuel consumption data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const calculateDailyConsumption = (key) => {
    return fuelConsumptions.reduce((total, consumption) => total + consumption[key], 0).toFixed(2);
  };

  const formattedFuelConsumptions = fuelConsumptions.map((consumption) => ({
    ...consumption,
    createdAt: new Date(consumption.createdAt).toLocaleString(),
  }));

  return (
    <main className='main-container p-4'>
      <div className='main-title text-2xl mb-4'>Dashboard</div>

      <div className='main-cards grid grid-cols-1 sm:grid-cols-2 gap-1'>
        <div className='card bg-white rounded-lg shadow-md p-4'>
          <div className='flex items-center justify-between mb-2'>
            <div>
              <HiCurrencyDollar className='card-icon text-4xl text-blue-500' />
              <h3 className='text-lg text-gray-600'>Daily Fuel Cost</h3>
            </div>
            <h2 className='text-2xl font-bold text-blue-900'>{calculateDailyConsumption('price')} MAD</h2>
          </div>
          <p className='text-gray-500'>Track your daily fuel expenses.</p>
        </div>
        <div className='card bg-white rounded-lg shadow-md p-4'>
          <div className='flex items-center justify-between mb-2'>
            <div>
              <BsFuelPump className='card-icon text-4xl text-green-500' />
              <h3 className='text-lg text-gray-600'>Fuel Efficiency</h3>
            </div>
            <h2 className='text-2xl font-bold text-green-900'>{calculateDailyConsumption('gazPerLiter')} L</h2>
          </div>
          <p className='text-gray-500'>Measure your vehicle's fuel efficiency.</p>
        </div>
      </div>
<br />
      <div className='charts grid grid-cols-1 md:grid-cols-2 gap-1'>
        <div className='bg-white rounded-lg shadow-md p-4'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={formattedFuelConsumptions}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='createdAt' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='price' fill='#4C51BF' />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='bg-white rounded-lg shadow-md p-4'>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={formattedFuelConsumptions}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='createdAt' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='price' stroke='#4C51BF' activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Home;

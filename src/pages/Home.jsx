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
        // Retrieve the user ID from local storage
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setClientId(user.id);

          // Fetch fuel consumption data from the API endpoint with the user ID
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

  // Calculate the daily consumption by adding up values from fuelConsumptions
  const calculateDailyConsumption = (key) => {
    return fuelConsumptions.reduce((total, consumption) => total + consumption[key], 0).toFixed(2);
  };
  const formattedFuelConsumptions = fuelConsumptions.map(consumption => ({
    ...consumption,
    createdAt: new Date(consumption.createdAt).toLocaleString(),
  }));

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Daily consumption by</h3>
            <HiCurrencyDollar className='card_icon' />
            <h2>{calculateDailyConsumption('price')} MAD</h2>
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Daily consumption by</h3>
            <BsFuelPump className='card_icon' />
            <h2>{calculateDailyConsumption('gazPerLiter')} % L</h2>
          </div>
        </div>
      </div>

      <div className='charts'>
      <ResponsiveContainer width='100%' height='100%'>
  <BarChart
    width={500}
    height={300}
    data={formattedFuelConsumptions}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray='3 3' />
    <XAxis dataKey='createdAt' />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey='price' fill='#8884d8' />
  </BarChart>
</ResponsiveContainer>

<ResponsiveContainer width='100%' height='100%'>
  <LineChart
    width={500}
    height={300}
    data={formattedFuelConsumptions}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray='3 3' />
    <XAxis dataKey='createdAt' />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type='monotone' dataKey='price' stroke='#8884d8' activeDot={{ r: 8 }} />
  </LineChart>
</ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;

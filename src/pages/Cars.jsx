import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import AuthService from '../Auth/AuthService';

const CreateCar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8888/CAR-SERVICE/api/car');
        if (response && response.data) {
          setCars(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch cars:', error.message);
      }
    };
    fetchCars();
  }, []);

  const filterCars = (car) => {
    return (
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleButtonClick = async (carId) => {
    try {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const userId = currentUser.id;
        await axios.get(`http://localhost:8888/CLIENT-SERVICE/api/client/affect/${carId}/${userId}`);
        console.log(`Car with ID ${carId} added to the user with ID ${userId}`);
      }
    } catch (error) {
      console.error('Failed to add car to user:', error.message);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center mb-4'>
        <input
          type='text'
          className='form-input px-4 py-2 border border-gray-300 rounded-md w-full'
          placeholder='Search...'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className='ml-2 text-gray-600' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cars.filter(filterCars).map((car) => (
          <div className='bg-white shadow-lg rounded-lg overflow-hidden' key={car.id}>
            <img src={car.picture} alt={`${car.brand} ${car.model}`} className='w-full h-32 sm:h-48 object-cover' />
            <div className='p-4'>
              <h2 className='text-lg font-bold'>{car.brand}</h2>
              <h5 className='text-md'>{car.model}</h5>
              <p className='text-sm text-gray-600'>{car.description}</p>
              <button onClick={() => handleButtonClick(car.id)} className='mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300'>Add Car</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateCar;

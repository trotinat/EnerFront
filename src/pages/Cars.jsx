import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import AuthService from '../Auth/AuthService'; // Update the path

import './styles/CreateCar.css'; // Adjust the path based on your project structure

const CreateCar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch cars from the specified endpoint
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
      // Fetch the current user from local storage
      const currentUser = AuthService.getCurrentUser();

      if (currentUser) {
        // Extract the user ID
        const userId = currentUser.id;

        await axios.get(`http://localhost:8888/CLIENT-SERVICE/api/client/affect/${carId}/${userId}`);

        console.log(`Car with ID ${carId} added to the user with ID ${userId}`);
      }
    } catch (error) {
      console.error('Failed to add car to user:', error.message);
    }
  };

  return (
    <div className='cont'>
      <div className='search'>
        <input
          type='text'
          className='form-control'
          placeholder='Search...'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className='search-icon' />
      </div>
      <div className='result'>
        {cars.filter(filterCars).map((car) => (
          <div className='cardd' key={car.id}>
            <div className='card-thumbnail-wrapper'>
              <img src={car.picture} className='card-thumbnail' alt={`${car.brand} ${car.model}`} />
            </div>
            <div className='card-content'>
              <h2>{car.brand}</h2>
              <h5>{car.model}</h5>
              <p>{car.description}</p>
              <button onClick={() => handleButtonClick(car.id)}>Add Car</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateCar;

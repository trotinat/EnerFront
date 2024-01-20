import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Info = () => {
  const [userCars, setUserCars] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const [checkedCars, setCheckedCars] = useState({});
  const [fuelLiters, setFuelLiters] = useState({});
  const [values, setValues] = useState({
    price: 12,
    gazPerLiter: 10,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setUserId(user.id);

          const response = await axios.get(`http://localhost:8888/CLIENT-SERVICE/api/client/${user.id}`);

          if (response && response.data) {
            const userData = response.data;
            const { cars } = userData;

            const initialCheckedCars = {};
            const initialFuelLiters = {};
            cars.forEach((car) => {
              initialCheckedCars[car.id] = car.status;
              initialFuelLiters[car.id] = 0;
            });

            setCheckedCars(initialCheckedCars);
            setFuelLiters(initialFuelLiters);
            setUserCars(cars || []);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const totalPages = Math.ceil(userCars.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCars = userCars.slice(startIndex, endIndex);

  const handleCheckboxChange = (carId) => {
    setCheckedCars((prevCheckedCars) => ({
      ...prevCheckedCars,
      [carId]: !prevCheckedCars[carId],
    }));
  };

  const handlePowerToggle = async (carId) => {
    try {
      await axios.get(`http://localhost:8888/CLIENT-SERVICE/api/client/power/${carId}/${userId}`);
      updateUserData();
    } catch (error) {
      console.error('Failed to toggle power:', error.message);
    }
  };

  const handleFuelChange = (carId, liters) => {
    setFuelLiters((prevFuelLiters) => ({
      ...prevFuelLiters,
      [carId]: liters,
    }));
  };

  const handleFuelSubmit = async (carId) => {
    try {
      const liters = fuelLiters[carId] || 0;
      await axios.put(`http://localhost:8888/CLIENT-SERVICE/api/client/fuel/${carId}/${liters}`);

      const submited = {
        ...values,
        price: values.price * liters,
        client_id: userId,
        car_id: carId,
      };

      await axios.post('http://localhost:8888/CONSUMPTION-SERVICE/api/consumption', submited);

      updateUserData();
    } catch (error) {
      console.error('Failed to fuel the car:', error.message);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:8888/CLIENT-SERVICE/api/client/trash/${carId}/${userId}`);
      updateUserData();
    } catch (error) {
      console.error('Failed to delete the car:', error.message);
    }
  };

  const updateUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/CLIENT-SERVICE/api/client/${userId}`);

      if (response && response.data) {
        const userData = response.data;
        const { cars } = userData;

        setUserCars(cars || []);

        const updatedFuelLiters = {};
        cars.forEach((car) => {
          updatedFuelLiters[car.id] = 0;
        });

        setFuelLiters(updatedFuelLiters);
      }
    } catch (error) {
      console.error('Failed to update user data:', error.message);
    }
  };
  

  return (
    <div className='cont-info'>
      <div className='cont-info bg-gray-100 p-8'>
  <div className='search mb-5'>
    <input type='text' className='form-control w-full p-3 border rounded-md' placeholder='Search...' />
  </div>
  <table className='min-w-full table-auto bg-white rounded-lg overflow-hidden shadow-lg'>
    <thead className='bg-gray-800 text-white'>
      <tr>
        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Picture</th>
        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Name</th>
        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Reservoir</th>
        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Consumption/KM</th>
        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Start/Stop</th>
        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Fuel</th>
        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentCars.map((car) => (
        <tr key={car.id} className='border-b'>
          <td className='px-6 py-4 whitespace-nowrap'>
            <img className='h-10 w-10 rounded-full' src={car.picture} alt={car.brand} />
          </td>
          <td className='px-6 py-4 whitespace-nowrap'>{`${car.brand} ${car.model}`}</td>
          <td className='px-6 py-4 whitespace-nowrap'>{`${car.currentTankSize}L`}</td>
          <td className='px-6 py-4 whitespace-nowrap'>{`${car.consumptionPerKm}%`}</td>
          <td className='px-6 py-4 whitespace-nowrap'>
            <label>
              <input
                type='checkbox'
                className='form-checkbox h-5 w-5 text-gray-600'
                checked={checkedCars[car.id] || car.status}
                onChange={() => {
                  handleCheckboxChange(car.id);
                  handlePowerToggle(car.car_id);
                }}
              />
            </label>
          </td>
          <td className='px-6 py-4 whitespace-nowrap'>
            <div className='flex items-center'>
              <input
                type='number'
                className='form-input mr-2 border rounded-md'
                value={fuelLiters[car.id] || 0}
                onChange={(e) => handleFuelChange(car.id, parseFloat(e.target.value))}
              />
              <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700' onClick={() => handleFuelSubmit(car.car_id)}>Fuel</button>
            </div>
          </td>
          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
            <button className='text-red-600 hover:text-red-900' onClick={() => handleDeleteCar(car.car_id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className='pagination mt-5 flex justify-between items-center'>
    <button
      className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50'
      onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className='text-gray-700'>{`Page ${currentPage} of ${totalPages}`}</span>
    <button
      className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50'
      onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
</div>
</div>

  );
};

export default Info;

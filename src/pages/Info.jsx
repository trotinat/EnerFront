import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Info = () => {
  const [userCars, setUserCars] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const [checkedCars, setCheckedCars] = useState({});
  const [fuelLiters, setFuelLiters] = useState({});
  const [values, setValues] = useState({
    price: 12, // Set the fixed price per liter
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
      <div className='search'>
        <input type='text' className='form-control' placeholder='Search...' />
      </div>
      <table className='tab'>
        <thead>
          <tr>
            <th className='coll'>Picture</th>
            <th className='coll'>Name</th>
            <th className='coll'>Reservoir</th>
            <th className='coll'>Consumption/KM</th>
            <th className='coll'>Start/Stop</th>
            <th className='coll'>Fuel</th>
            <th className='coll'>Actions</th> {/* New column for actions */}

          </tr>
        </thead>
        <tbody>
          {currentCars.map((car) => (
            <tr key={car.id}>
              <td className='col'>
                <img className='imgg' src={car.picture} alt={car.brand} />
              </td>
              <td className='coll'>{`${car.brand} ${car.model}`}</td>
              <td className='coll'>{`${car.currentTankSize}L`}</td>
              <td className='coll'>{`${car.consumptionPerKm}%`}</td>
              <td>
                <label>
                  <input
                    type='checkbox'
                    checked={checkedCars[car.id] || car.status}
                    onChange={() => {
                      handleCheckboxChange(car.id);
                      handlePowerToggle(car.car_id);
                    }}
                  />
                </label>
              </td>
              <td className='fuel-column'>
                <div className='fuel-container'>
                  <input
                    type='number'
                    value={fuelLiters[car.id] || 0}
                    onChange={(e) => handleFuelChange(car.id, parseFloat(e.target.value))}
                  />
                  <button onClick={() => handleFuelSubmit(car.car_id)}>Fuel</button>
                </div>
              </td>
              <td className='coll'> {/* New column for delete button */}
                <button onClick={() => handleDeleteCar(car.car_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Info;

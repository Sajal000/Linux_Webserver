import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const BASE_URL = `http://localhost:8080/api/persons`;

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [updateId, setUpdateId] = useState(null); 
  const [updateName, setUpdateName] = useState('');
  const [updateAge, setUpdateAge] = useState('');

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const personToUpload = { name, age: parseInt(age) };

    try {
      await axios.post(BASE_URL, personToUpload);
      await fetchData(); 
      setName('');
      setAge('');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      await fetchData(); 
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleUpdate = (id) => {
    setUpdateId(id); 
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const personToUpdate = { name: updateName, age: parseInt(updateAge) };

    try {
      await axios.put(`${BASE_URL}/${updateId}`, personToUpdate);
      await fetchData();
      setUpdateId(null); 
      setUpdateName('');
      setUpdateAge('');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="app-display">
      <div className="user-input">
        <h1>Enter your info:</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <br />

          <label htmlFor="age">Age: </label>
          <input 
            type="number" 
            id="age" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            required 
          />
          <br />
          <button type="submit">Submit</button>
        </form>

        {updateId && (
          <form onSubmit={handleUpdateSubmit}>
            <h2>Update Person {updateId} Info:</h2>
            <label htmlFor="updateName">Name: </label>
            <input 
              type="text" 
              id="updateName" 
              value={updateName} 
              onChange={(e) => setUpdateName(e.target.value)} 
              required 
            />
            <br />

            <label htmlFor="updateAge">Age: </label>
            <input 
              type="number" 
              id="updateAge" 
              value={updateAge} 
              onChange={(e) => setUpdateAge(e.target.value)} 
              required 
            />
            <br />
            <button type="submit">Update</button>
          </form>
        )}
      </div>

      <div className="data-display">
        <h1>People:</h1>
        <ul>
          {data && data.map((person) => (
            <li key={person.id}>
              {person.name} - {person.age} years old 
              <button onClick={() => handleDelete(person.id)}>Delete</button>
              <button onClick={() => handleUpdate(person.id)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

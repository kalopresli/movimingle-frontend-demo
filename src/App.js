import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [responseData, setResponseData] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;


  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  };

  const handleAddMovie = () => {
    axios.post(`${apiUrl}/movies`, {
      externalId: "movie12",
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO."
    }, { headers })
      .then(response => setResponseData(JSON.stringify(response.data, null, 2)))
      .catch(error => setResponseData(error.message));
  };

  const handleGetMovie = () => {
    axios.get(`${apiUrl}/movies/movie12`, { headers })
      .then(response => setResponseData(JSON.stringify(response.data, null, 2)))
      .catch(error => setResponseData(error.message));
  };

  const handleAddToFavorites = () => {
    axios.post(`${apiUrl}/favorites/add`, {
      userId: 67,
      movieId: "movie12"
    }, { headers })
      .then(response => setResponseData(JSON.stringify(response.data, null, 2)))
      .catch(error => setResponseData(error.message));
  };

  const handleGetFavorites = () => {
    axios.get(`${apiUrl}/favorites?userId=67`, { headers })
      .then(response => setResponseData(JSON.stringify(response.data, null, 2)))
      .catch(error => setResponseData(error.message));
  };

  const handleCreateParty = () => {
    axios.post(`${apiUrl}/party/create`, 67, { headers })
      .then(response => setResponseData("Party Created Successfully"))
      .catch(error => setResponseData(error.message));
  };

  const handleGetParty = () => {
    axios.get(`${apiUrl}/party/67`, { headers })
      .then(response => setResponseData(JSON.stringify(response.data, null, 2)))
      .catch(error => setResponseData(error.message));
  };

  return (
    <div>
      <h1>Movie and Favorites Demo</h1>
      <button onClick={handleAddMovie}>Add New Movie</button>
      <button onClick={handleGetMovie}>Get Movie By ExternalId</button>
      <button onClick={handleAddToFavorites}>Add Movie To Favorites</button>
      <button onClick={handleGetFavorites}>Get Favorites By User</button>
      <button onClick={handleCreateParty}>Create Party</button>
      <button onClick={handleGetParty}>Get Party By User</button>
      <pre>{responseData}</pre>
    </div>
  );
}

export default App;

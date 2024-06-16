import React, { useState } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';
import './App.css'; // Ensure to create this CSS file in your project

function App() {
  const [responseData, setResponseData] = useState(null);
  const [movieId, setMovieId] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [jwtToken, setJwtToken] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const headers = () => ({
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  });

  const handleAddMovie = () => {
    if (!movieId || !movieTitle || !movieDescription) {
      alert("All movie fields must be filled out");
      return;
    }
    axios.post(`${apiUrl}/movies`, {
      externalId: movieId,
      title: movieTitle,
      description: movieDescription
    }, { headers: headers() })
      .then(response => setResponseData(response.data))
      .catch(error => setResponseData({ error: error.message }));
  };

  const handleGetMovie = () => {
    if (!movieId) {
      alert("Movie ID is required");
      return;
    }
    axios.get(`${apiUrl}/movies/${movieId}`, { headers: headers() })
      .then(response => setResponseData(response.data))
      .catch(error => setResponseData({ error: error.message }));
  };

  const handleAddToFavorites = () => {
    if (!userId || !movieId) {
      alert("User ID and Movie ID are required");
      return;
    }
    axios.post(`${apiUrl}/favorites/add`, {
      userId: userId,
      movieId: movieId
    }, { headers: headers() })
      .then(response => setResponseData(response.data))
      .catch(error => setResponseData({ error: error.message }));
  };

  const handleGetFavorites = () => {
    if (!userId) {
      alert("User ID is required");
      return;
    }
    axios.get(`${apiUrl}/favorites?userId=${userId}`, { headers: headers() })
      .then(response => setResponseData(response.data))
      .catch(error => setResponseData({ error: error.message }));
  };

  const handleCreateParty = () => {
    if (!userId) {
      alert("User ID is required");
      return;
    }
    axios.post(`${apiUrl}/party/create`, { userId: userId }, { headers: headers() })
      .then(response => setResponseData("Party Created Successfully"))
      .catch(error => setResponseData({ error: error.message }));
  };

  const handleGetParty = () => {
    if (!userId) {
      alert("User ID is required");
      return;
    }
    axios.get(`${apiUrl}/party/${userId}`, { headers: headers() })
      .then(response => setResponseData(response.data))
      .catch(error => setResponseData({ error: error.message }));
  };

  return (
    <div className="app-container">
      <h1 className="title">Movie and Favorites Demo</h1>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          value={jwtToken}
          onChange={e => setJwtToken(e.target.value)}
          placeholder="Paste JWT here"
        />
        <input
          className="input-field"
          type="text"
          value={movieId}
          onChange={e => setMovieId(e.target.value)}
          placeholder="Enter movie ID"
        />
        <input
          className="input-field"
          type="text"
          value={movieTitle}
          onChange={e => setMovieTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <input
          className="input-field"
          type="text"
          value={movieDescription}
          onChange={e => setMovieDescription(e.target.value)}
          placeholder="Enter movie description"
        />
        <input
          className="input-field"
          type="text"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Enter user ID"
        />
      </div>
      <div className="button-container">
        <button className="button" onClick={handleAddMovie}>Add New Movie</button>
        <button className="button" onClick={handleGetMovie}>Get Movie By ExternalId</button>
        <button className="button" onClick={handleAddToFavorites}>Add Movie To Favorites</button>
        <button className="button" onClick={handleGetFavorites}>Get Favorites By User</button>
        <button className="button" onClick={handleCreateParty}>Create Party</button>
        <button className="button" onClick={handleGetParty}>Get Party By User</button>
      </div>
      <div className="response-display">
        {responseData && <ReactJson src={responseData} theme="rjv-default" collapsed={false} enableClipboard={true} />}
      </div>
    </div>
  );
}

export default App;

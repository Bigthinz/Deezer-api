const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

// const API_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_PROXY_URL = ' https://cors.eu.org'
const DEEZER_API_BASE_URL = 'https://api.deezer.com';

app.get('/api', async (req, res) => {
  try {
    const { q } = req.query;
    // const response = await axios.get(`${API_PROXY_URL}${DEEZER_API_BASE_URL}/search?q=${q}`);
    const response = await axios.get(`${API_PROXY_URL}/${DEEZER_API_BASE_URL}/user/2529/playlists`)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});



app.get('/api/chart', async (req, res) => {
    try {
      const { q } = req.query;
      // const response = await axios.get(`${API_PROXY_URL}${DEEZER_API_BASE_URL}/search?q=${q}`);
      const response = await axios.get(`${API_PROXY_URL}/${DEEZER_API_BASE_URL}/chart/0/tracks`)
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.get('/api/album/:q', async (req, res) => {
    try {
      const { q } = req.params;
      const response = await axios.get(`${API_PROXY_URL}/${DEEZER_API_BASE_URL}/artist/${q}/top?limit=5`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
      res.status(500).json({ error: 'An error occurred while fetching albums' });
    }
  });

  app.get('/api/top/:q', async (req, res) => {
    try {
      const { q } = req.params;
      const response = await axios.get(`${API_PROXY_URL}/${DEEZER_API_BASE_URL}/artist/${q}/albums`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
      res.status(500).json({ error: 'An error occurred while fetching albums' });
    }
  });
  

  


app.get('/api/search', async (req, res) => {
    try {
      const { q } = req.query;
      const response = await axios.get(`${DEEZER_API_BASE_URL}/search/track?q=${q}`);
    
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

  app.get('/api/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the id parameter from the URL
    // Use the id to fetch data or perform other operations
   
    const response = await axios.get(`${API_PROXY_URL}/${DEEZER_API_BASE_URL}/artist/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
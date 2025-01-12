const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());

app.get('/wordle', async (req, res) => {
  const date = new Date().toISOString().split('T')[0];
  const url = `https://www.nytimes.com/svc/wordle/v2/${date}.json`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Wordle data' });
  }
});

app.listen(3001, () => {
  console.log('Proxy server listening on port 3001');
});
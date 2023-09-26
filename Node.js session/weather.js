const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

const AGIFY_API_URL = 'https://api.agify.io';

app.get('/predict-age', async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ error: 'Name is required in the request body.' });
  }

  try {
    const response = await axios.get(`${AGIFY_API_URL}?name=${name}`);

    if (response.status === 200) {
      const data = response.data;
      const agePrediction = data.age;

      res.json({ name, agePrediction });
    } else {
      res.status(response.status).json({ error: 'Failed to predict age.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to predict age.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

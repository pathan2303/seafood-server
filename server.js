const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.all('/proxy', async (req, res) => {
  try {
    const url = 'https://script.google.com/macros/s/AKfycbxVhtPq8fvdCjRR00gf-EsyNAyI9ZQoHWqCrMiaXmJsliqL2o7j75A-AS3ij34Qsk0G/exec'; // Apps Script URL
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: req.headers,
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false // Disable SSL verification for testing
      })
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy server running on port 3000');
});

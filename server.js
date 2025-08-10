const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.all('/proxy', (req, res) => {
  const url = 'https://script.google.com/macros/s/AKfycbxVhtPq8fvdCjRR00gf-EsyNAyI9ZQoHWqCrMiaXmJsliqL2o7j75A-AS3ij34Qsk0G/exec'; // Replace with your Apps Script URL
  req.pipe(request({ url, method: req.method, json: req.body })).pipe(res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy server running on port 3000');
});

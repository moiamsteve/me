// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const { targetUrl, username, password, port } = req.body;

  try {
    const response = await axios.get(targetUrl, {
      proxy: {
        host: 'p.webshare.io', // Webshare default proxy domain
        port: parseInt(port),
        auth: { username, password }
      },
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html'
      }
    });
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Proxy fetch failed: " + err.message);
  }
});

app.listen(3000, () => console.log("Proxy relay running on port 3000"));

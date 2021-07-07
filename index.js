const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const start = (port = '5050') => {
  app.listen(port, async () => {
    console.log(`Access Dashboard listening on port ${port}`);
  });
};

module.exports = { start };

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const setup = (port = '5050') => {
  app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);
  });
};


module.exports = setup;
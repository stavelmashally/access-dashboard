const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());

app.use('/', router);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Access Dashboard listening on port ${port}`);
});
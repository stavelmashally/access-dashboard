const express = require('express');
const { defaultConfig, modifyConfig } = require('../configs');

const router = express.Router();

router.get('/default', async (req, res) => {
  return res.status(200).json(defaultConfig);
});

router.post('/default', async (req, res) => {
  const { config } = req.body;
  console.log(config);
  return res.status(200).json({ msg: 'success' });
});

router.get('/modify', async (req, res) => {
  return res.status(200).json(modifyConfig);
});

module.exports = router;

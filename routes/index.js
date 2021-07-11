const express = require('express');
const defaultConfig = require('../configs/default');
const modifyConfig = require('../configs/modify');

const router = express.Router();

router.get('/defaultConfig', async (req, res) => {
  return res.status(200).json(defaultConfig);
});

router.get('/modifyConfig', async (req, res) => {
  return res.status(200).json(modifyConfig);
});

module.exports = router;

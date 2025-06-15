const express = require('express');
const router = express.Router();
const Band = require('../models/Band');

// ✅ Test route
router.get('/test', (req, res) => {
    console.log('GET /api/bands/test');
  res.send('API works');
});

router.post('/', async (req, res) => {
  const { name, owner } = req.body;
  const band = new Band({ name, owner, members: [owner] });
  await band.save();
  res.json(band);
});

router.get('/:owner', async (req, res) => {
  const bands = await Band.find({ owner: req.params.owner });
  res.json(bands);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Band = require('../models/Band');
const auth = require('../middleware/auth');

// GET bands for the logged-in user
router.get('/', auth, async (req, res) => {
  const bands = await Band.find({ owner: req.user.id });
  res.json(bands);
});

// POST a new band
router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  const band = new Band({
    name,
    owner: req.user.id,
    members: [req.user.id]
  });
  await band.save();
  res.json(band);
});

// Optional test route (public)
router.get('/test', (req, res) => {
  res.send('API works');
});

module.exports = router;

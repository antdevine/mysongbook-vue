const mongoose = require('mongoose');
const BandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  members: [String],
});
module.exports = mongoose.model('Band', BandSchema);
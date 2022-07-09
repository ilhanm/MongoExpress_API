const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    region: String,
})

module.exports = mongoose.model('country', schema);
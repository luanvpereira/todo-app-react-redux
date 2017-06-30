const mongoose = require('mongoose');
mongoose.Primise = global.Promise;

module.exports = mongoose.connect('mongodb://localhost/todo');
var mongoose = require('mongoose');

//set mongoose to use promises
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

mongoose.connect(process.env.MONGODB_URI);
module.exports = {mongoose};

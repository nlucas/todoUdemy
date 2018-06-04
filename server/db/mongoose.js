var mongoose = require('mongoose');

//set mongoose to use promises
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

mongoose.connect('mongodb://nlp412:nlp412@ds247690.mlab.com:47690/node-todo-api' || 'mongodb://localhost:27017/TodoApp')
module.exports = {mongoose};

var env = process.env.NODE_ENV || 'development';
console.log('env *****', env)

if (process.env.PORT) {
  process.env.MONGODB_URI =
  'mongodb://nlp412:nlp412@ds247690.mlab.com:47690/node-todo-api'
} else {
  process.env.PORT = 3000;
  if (env === 'development') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
  } else if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
  }
}

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoAppUdemy', {useNewUrlParser:true}, (err, client) => {
  if (err) {
    return console.log('unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server');

  const db = client.db('ToDoAppUdemy');

  // db.collection('TodosUdemy').insertOne({
  //   text: 'Something to do',
  //   completed: false,
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert todo', err)
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // })

  db.collection('UsersUdemy').insertOne({
    name: 'Chris San Soucie',
    age: 43,
    location: 'Boston, MA'
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert todo', err)
    }
    console.log(JSON.stringify(result.ops, undefined, 2))
  });

  client.close();
})

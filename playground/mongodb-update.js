// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoAppUdemy', {useNewUrlParser:true}, (err, client) => {
  if (err) {
    return console.log('unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server');

  const db = client.db('ToDoAppUdemy');

  // db.collection('TodosUdemy').find().toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   if (err) {
  //     return console.log('Unable to get Todos', err)
  //   }
  // })

  db.collection('TodosUdemy').findOneAndUpdate({
    _id: new ObjectID("5b1188f50cb891e65c3e4b8d")
  },
  { $set: {test: 'does this work'}}
).then((result) => {
  console.log(JSON.stringify(result, undefined, 2))
})




  client.close();
})

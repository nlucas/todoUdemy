const expect = require('expect');
const request = require('supertest')

const {ObjectID} = require('mongodb');
const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second todo',
    completed: true,
    completedAt: 12345,
  },
]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        //if we get an error above, finish the test
        if (err) {
          return done(err);
        }
        //test assumptions about database
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var badId = new ObjectID();

    request(app)
      .get(`/todos/${badId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  })
});

describe('DELETE /todos/:id', () => {

  hexID = todos[1]._id.toHexString();

  it('should delete a todo doc', (done) => {
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID).then((res) => {
          expect(res).toBeFalsy();
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it('should return 404 if todo not found', (done) => {
    var badID = new ObjectID();

    request(app)
      .get(`/todos/${badID.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update text, completed, and completedAt', (done) => {
    var hexID = todos[0]._id.toHexString();
    var newText = "test new PATCH route with this todo"
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        "text": newText,
        "completed": true,
        })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({newText}).then((todo) => {
          expect(res.body.todo.text).toBe(newText);
          expect(res.body.todo.completed).toBe(true);
          expect(typeof res.body.todo.completedAt).toBe('number');
          done();
        }).catch((e) => {
          return done(e);
        })
      });
  });

  it('should clear completedAt when todo is set to false', (done) => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: false,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID).then((res) => {
          expect(res.completed).toBe(false);
          expect(res.completedAt).toBe(null);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
});

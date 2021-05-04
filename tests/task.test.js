const app = require('../src/app');
const request = require('supertest');
const Task = require('../src/models/task');
const { mockUser, mockUserId, setTestDB } = require('../tests/fixtures/db');

beforeEach(setTestDB);

test('Should create task', async () => {
   const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send({
        description: 'This is my test task.'
    })
    .expect(201);

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});
const request = require('supertest');
const app = require('../src/app');

test('Should create a user', async () => {
    await request(app).post('/users').send({
        name: 'Frank',
        email: 'frrn@example.com',
        password: 'MyPass432!'
    }).expect(201);
})
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { mockUser, mockUserId, setTestDB } = require('../tests/fixtures/db');

beforeEach(setTestDB);

test('Should create a user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Frank',
        email: 'frrn@example.com',
        password: 'MyPass432!'
    }).expect(201);

    const user = await User.findById(response.body.user._id);

    expect(response.body).toMatchObject({
        user: {
            name: 'Frank',
            email: 'frrn@example.com',
        },
        token: user.tokens[0].token
    });

});

test('Should login', async () => {
    const response = await request(app).post('/users/login').send({
        email: "gigolo@example.com",
        password: "giGolo123!"
    }).expect(200);

    const user = await User.findById(response.body.user._id);
    
    expect(response.body.token).toBe(user.tokens[1].token);
    
});

test('Should not login if bad credentials', async () => {
    await request(app).post('/users/login').send({
        email: "gigol@example.com",
        password: "giGol123!"
    }).expect(400);
});

test('Should get user information', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get user info if not authenticated', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for user', async () => {
   await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send()
    .expect(200);

    const user = await User.findById(mockUserId);
    expect(user).toBeNull();
});

test('Should not delete if user not authenticated', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('Should upload an avatar', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

    const user = await User.findById(mockUserId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update user', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send({
        name: "Dagoberto"
    })
    .expect(200);

    const user = await User.findById(mockUserId);
    expect(user.name).toEqual('Dagoberto');
});

test('Should not update user if field not allowed provided', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send({
        height: "Dagoberto"
    })
    .expect(400);
});
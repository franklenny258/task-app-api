const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

const mockUserId = mongoose.Types.ObjectId();

const mockUser = {
    _id: mockUserId,
    name: "Gigolo",
    email: "gigolo@example.com",
    password: "giGolo123!",
    tokens: [{
        token: jwt.sign({ _id: mockUserId }, process.env.JWT_SECRET)
    }]
}

const setTestDB = async () => {
    await User.deleteMany();
    const user = new User(mockUser);
    await user.save();
}

module.exports = {
    mockUserId,
    mockUser,
    setTestDB
}
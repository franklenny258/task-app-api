const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
     useUnifiedTopology: true,
     useCreateIndex: true,
     useNewUrlParser: true,
     useFindAndModify: false
});

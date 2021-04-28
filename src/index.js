const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//     res.status(503).send('Service unavailable, server is under maintenace');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log('App already running on port ' + port));
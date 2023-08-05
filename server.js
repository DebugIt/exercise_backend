const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB
require("./connection/connections");

// routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
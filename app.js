const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes
const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');

const app = express();
const port = 1338;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);


// Start up server

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Exporting server for testing purpose
module.exports = server;

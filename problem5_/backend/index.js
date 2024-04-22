const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// CORS
var corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost.3000'],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Routes

app.use('/', require('./src/routes/index'));

// Error handling
app.use(function (error, req, res, next) {
    next(createError(404));
    console.log(error.message)
    const strError = JSON.stringify(error.message);
    const body = JSON.stringify(req.body);
    const errorMessage = `${req.method} ${req.path} - ${strError} - Body::${body}`;
    console.log(errorMessage);
});

// init handle exceptions
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Service Error'
    })
})

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
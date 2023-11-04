const express = require('express');
const path = require('path');
const pageRouter = require('./routes/pages');


const app = express();

// for body parser.
app.use(express.urlencoded({ extended: false }));

//Server static files
app.use(express.static(path.join(__dirname, 'public')));

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes
app.use('/', pageRouter);

//errors: pagen not found 404
app.use((request, response, next) => {
    let err = new Error('Page no found');
    err.status = 404;
    next(err);
});

// handling errors
app.use((err, request, response, next) => {
    response.status(err.status || 500);
    response.send(err.message);
});


//settingg up the server
app.listen(3000, () => {
    console.log('Server is running on port 30000...')
})

module.exports = app;
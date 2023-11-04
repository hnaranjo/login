const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user = new User();

//get index page
router.get('/', (request, response, next) => {
    response.render('index', { title: "My Application" });
});

// Get home page
router.get('/home', (request, response, next) => {
    response.send('This is the home page');
});

//Post Login data
router.post('/login', (request, response, next) => {
    user.login(request.body.username, request.body.password, function (result) {
        if (result) {
            response.send('Logged in as: ' + result.username);
        } else {
            response.send('Username/Password incorrect!');
        }
    });
});

//Post register data
router.post('/register', (request, response, next) => {
    let userInput = {
        username: request.body.username,
        fullname: request.body.fullname,
        password: request.body.password
    };
    user.create(userInput, function (lastId) {
        if (lastId) {
            response.send('Welcome ' + userInput.username);
        } else {
            console.log('Error creating a new user ...');
        }
    });
});


module.exports = router;
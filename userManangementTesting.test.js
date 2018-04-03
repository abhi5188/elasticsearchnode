var request = require('supertest');
var app = require('D:/elasticsearchnode/userManagement.js').app;

describe('User Management Services', () => {

//For get user list function
it('should return the list of users', (done) =>{

    request(app)
    .get('/getUserList')
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });

});

it('getUserList should return the reponse status as 200', (done) =>{

    request(app)
    .get('/getUserList')
    .expect(200)
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });

});


//For delete user data function
it('should delete the user', (done) =>{

    request(app)
    .get('/deleteUserData/4')
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });

});

it('deleteUserData should return the reponse status as 200', (done) =>{

    request(app)
    .get('/deleteUserData/4')
    .expect(200)
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });

});


//For create user data function
it('should create the user', (done) =>{

    request(app)
    .get('/createUserData')
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });

});

it('createUserData should return the reponse status as 200', (done) =>{

    request(app)
    .get('/createUserData')
    .expect(200)
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });

});


//For update user data function
it('should update the user', (done) =>{

    request(app)
    .get('/updateUserData')
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });

});

it('updateUserData should return the reponse status as 200', (done) =>{

    request(app)
    .get('/updateUserData')
    .expect(200)
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });

});


});


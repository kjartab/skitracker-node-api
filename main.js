require('./env.js');
var express = require('express');
var app = express();
var db = require('./db.js');

app.get('/segments', function(req, res) {
    tracksPromise = db.getSegments()
    .then(response => res.send(response.rows));
});

app.get('/points', function(req, res) {
    pointsPromise = db.getPoints(req.query.limit || 1)
    .then(response => res.send(response.rows));
});

app.listen(3000);

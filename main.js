const express = require('express');
const mustacheExpress = require('mustache-express');
const mustache = require("mustache");
const app = express();
const mongo = require("mongodb").MongoClient;

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.use(express.static('public'));

mongo.connect("mongodb://localhost:27017/test", function (err, db) {
    let robots = db.collection("robots");
    app.get("/", function (req, res) {
        robots.find().toArray()
            .then(function (robots) {
                res.render('robo.mustache', {
                    users: robots
                });
            });
    });
    app.get("/job", function (req, res) {
        robots.find({ job: { $ne: null } }).toArray()
            .then(function (robots) {
                console.log(robots);
                res.render('robo.mustache', {
                    users: robots
                });
            });
    });
    app.get('/nojob', function (req, res) {
        robots.find({ job: null }).toArray()
            .then(function (robots) {
                res.render('robo.mustache', {
                    users: robots
                });
            });
    });
    app.listen(3000, function () {
        console.log("Ham Sammich!");
    });
});
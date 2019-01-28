const express = require('express');
const bparser = require('body-parser');
const validation = require('./scripts/server/validation');
//const DBManager = require('./scripts/server/database-driver');

var app = express();



app.use(express.static("./"));
app.use(bparser());

app.get('/', function(req, res){
    res.sendFile('./views/index.html', {root:'./'}, function (err) {
        res.end();
    });
});

app.post('/signup', function(req, res){
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password1);
    console.log(req.body.password2);

    var errs = validation.validate_signup_data(req.body.username, req.body.password1, req.body.password2, req.body.email);
    console.log(errs);
    res.end();
});

app.listen(5555);

const express = require("express");
const bparser = require('body-parser');
const cparser = require("cookie-parser");
const DB = require("./scripts/server/DB");

var app = express();
var http_server = app.listen(5555);

app.set("view engine", "ejs");
app.use(express.static("."));
app.use(bparser.json());
app.use(cparser());
app.use(bparser.urlencoded({extended:true}));


var globals = {};



app.get("/", function(req, res){
    res.render("signup");
});


app.post("/signup", function(req, res){

    var response_obj = {};
    
    if( DB.check_duplicate(req.body) )
        response_obj.error = " ";
    
    res.cookie("U_ID", "123456");
    res.send(JSON.stringify(response_obj));
    
});


app.get("/verify", function(req, res){
    res.render("verify");
});



app.post("/verify", function(req, res){
    res.send(JSON.stringify({}) );
});



app.get("/home", function(req, res){
    res.render("home");
});


const IO_cparser = require("socket.io-cookie-parser"); 
var IO_server = require("socket.io")(http_server);

IO_server.use(IO_cparser());

IO_server.on("connection", function(socket){
   console.log( socket.request.cookies );
   console.log(socket.id);
});
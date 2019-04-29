const express = require('express');
const bparser = require('body-parser');
const validation = require('./scripts/server/validation');
const ejs = require('ejs');
const DBController = require('./scripts/server/database-driver');
const nodeMailer = require('nodemailer');
const fs = require('fs');

var app = express();

//my middleware
var cookieParser = function(req, res, next){
    console.log("hello cookies");
    req.cookies = {};
    var cookie_string =req.header("cookie");
    if(cookie_string != undefined){
        var cookiesArr = cookie_string.split(';');
        req.Incitescookies = {};                       
        cookiesArr.forEach(function(val, i, arr){
            var res = val.split("=");
            res[0] = res[0].trimLeft().trimRight();
            res[1] = res[1].trimLeft().trimRight();
            req.cookies[res[0]] = res[1];
        });
        console.log(req.cookies);
    }
    next();
}

var check_c_user = function(req, res, next){
    var match_list = req.url.match("(Login|SignUp)$");
    console.log(req.url); 
    console.log(match_list);
    if(match_list){
        next();
    }

    else if(!req.cookies || req.cookies && !req.cookies["C_user"]){
        console.log("rendering in c_user");
        res.render("index");
        res.end();
    }
    else{
        console.log("I'm nexted");
        next();
    }
}

app.set("view engine", "ejs");
app.use(express.static("./"));
app.use(bparser.json());
app.use(bparser.urlencoded({extended:true}));
app.use(cookieParser);
app.use(check_c_user);


app.post('/SignUp',async function(req, res){
    //validate input data
    var errs = validation.validate_signup_data(req.body.uname, req.body.pass1, req.body.pass2, req.body.email);
    //for debugging
    if(errs.length == 0)
    {
        var veri_code;
        //generate auth code
        veri_code = (Date.now() % 10e5).toString() ;
        //insert in temp user
        var user = {
            username : req.body.uname,
            email : req.body.email,
            password : req.body.pass1,
            veriCode : veri_code,
            type : "not verified"
        }
        var result = await DBController.insert_user(user);

        if(result != "duplicate"){
            //send v email
            //var result = await send_verif_email(req.body.email, auth_code);
            console.log(result);
            console.log("first-----------------------");

            //redirect to complete sign up
            res.cookie("C_user", result, {httpOnly:true});
            res.send(JSON.stringify({ "res" : "OK" , "next" : render("verification")}));
            
            console.log("second----------------------");
        }
        else
            res.send(JSON.stringify({ "res" : "duplicate" }));
    }
    else
    {
        //redirect to sign up page again and show errors
        res.send(JSON.stringify({ "res" : errs }));
    }
});


app.post('/Login', async function(req, res){
    
    var user = JSON.parse(req.body);
    //check if user exists in users doc
    var result = await DBController.get_user_by_email(user.email);
    
    if(result && result != "failed"){
        if(! result.email){
            res.send( JSON.stringify({"res" : "unregistered"}) );
        }
        else if( result.email == user.email && result.password == user.password){
            if(result.type == "verified"){
                res.cookie("C_user", result._id.toHexString(), {httpOnly:true});
                res.send( JSON.stringify({"res" : "permanent"}) );
            }
            else
            res.send( JSON.stringify({"res" : "temp" , "next" : render("verification") }) );   
        }   
    }
        

});

app.get('/', function(req, res){
    res.redirect("/home");
});


app.get('/home', async function(req, res){
    
    var result = await DBController.get_user(req.cookies["C_user"]);
    if(result.type == "not verified"){
        res.clearCookie("C_user");
        res.redirect("/");
    }
    else
        res.render("home",{name: "niko"});
});

app.get('/friends', function(req, res){

    //get friends list
    var friends_list = [
        {
            name : "Amr",
            img_name : "amrhossam902",
            state : "active"
        },
        {
            name: "Ali",
            img_name : "amr.amr168",
            state : "offline"
        }
    ];

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(friends_list));
});

app.post('/verify', async function(req, res){
    var result = await DBController.get_user(req.cookies["C_user"]);
    console.log("this is vericode in verify------" + req.body);
    if(result && result != "failed")
        if(result.veriCode == req.body["veri_code"]){
            await DBController.update_user(req.cookies["C_user"], {"type" : "verified"});
            res.send(JSON.stringify({verified: "OK"}));
        }
            
        else
            res.send(JSON.stringify({verified: "incorrect"}));

});

app.post('/resendCode', async function(req, res){
    var user = await DBController.get_user(req.cookies["C_user"]);
    console.log(user);
    //send_verif_email(user.email, user.veriCode);
});


function render(view){
    var s = fs.readFileSync("./views/" + view + ".ejs").toString();
    return ejs.render(s);
}


async function send_verif_email(email, auth_code){
    
    //send email with auth code

    var transporter = nodeMailer.createTransport({
        service : "gmail",
        auth : {
            user: 'socwork777@gmail.com',
            pass: 'socwork1234'
        }
    });

    var mailOptions = {
        from: 'socwork777@gmail.com',
        to: email,
        subject: 'Complete Sign Up',
        text: "please Enter this auth code to complete registeration : " + auth_code
    };
    
    var p = await transporter.sendMail(mailOptions);
    return "mail sent successfully";
}



app.listen(5555);
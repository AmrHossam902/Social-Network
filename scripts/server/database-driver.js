const Mongoclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbname = 'social';

const EventEmitter = require('events');
var emitter = new EventEmitter();
/*
module.exports.insert_user = 
async function insert_user(username, email, password, auth_code, class) {
    var client = new Mongoclient(url, {useNewUrlParser:true});
    try{
    
        await client.connect();
        var db = client.db(dbname);
        var p3;

        var p1 = await db.collection('User').findOne({"email":email});

        var p2 = await db.collection('TempUser').findOne({"email": email});

        if(p1 == null && p2 == null)
            p3 = await db.collection('TempUser').insertOne({username: username, email: email, password: password, code:auth_code});
    
    }
    catch(err){
        console.log(err);
    }

    await client.close();

    if(p3 && p3.insertedCount == 1)
        return   p3.insertedId.toHexString();
    
    return "insertion failed";
}
*/
module.exports.insert_user = 
async function insert_user(user) {
    var client = new Mongoclient(url, {useNewUrlParser:true});
    try{
    
        await client.connect();
        var db = client.db(dbname);

        var p1 = await db.collection('User').findOne({"email":user.email});
        var p2;
        if(p1 == null)
            p2 = await db.collection('User').insertOne(user);
    
    }
    catch(err){
        console.log(err);
    }

    await client.close();

    if(p2 && p2.insertedCount == 1)
        return   p2.insertedId.toHexString();
    
    return "duplicate";
}



module.exports.get_user_type = 
async function get_user_type(email){
    //unregistered - temporary(not verified yet) - permanet(verified)
    var client = new Mongoclient(url, {useNewUrlParser:true});
    await client.connect();
    var db = client.db(dbname);

    var result = await db.collection("PermUser").findOne({ email: email});
    
    if(result != null)
        return "permanent";
    
    result = await db.collection("TempUser").findOne({ email: email});
    
    if(result != null)
        return "temp";
    
    return "unregistered";
}

module.exports.verify_user = 
async function verify_user(UID, auth_code){

    var client = new Mongoclient(url, {useNewUrlParser:true});
    
    try{

        await client.connect();
        var result = client.db(dbname).collection("TempUser").findOne({_id: UID});
        if(result.auth_code == auth_code)
            return "OK";
        else
            return "incorrect code";
    }
    catch(err){
        console.log(err);
    }
    console.log("exception thrown ");
    return "exception";
}

module.exports.get_user = 
async function get_user(UID){
    var client = new Mongoclient(url, {useNewUrlParser:true});

    try {
        await client.connect();
        var result = await client.db(dbname).collection("User").findOne({"_id" : new (require('mongodb').ObjectId)(UID)}, {fields: {email : 1, username: 1, veriCode: 1}});
        console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        return "failed";
    }
}

module.exports.get_user_by_email = 
async function get_user_by_email(email){
    var client = new Mongoclient(url, {useNewUrlParser:true});
    var p;
    try {
        await client.connect();
        p = await client.db(dbname).collection("User").findOne({email: email});       
    } catch (error) {
        return "failed";
    }

    return p;
}


module.exports.update_user =
async function update_user(UID, updates){
    var client = new Mongoclient(url, {useNewUrlParser:true});
    try {
        await client.connect();
        await client.db(dbname).collection("User").updateOne({_id : new (require("mongodb").ObjectId)(UID)}, {"$set": updates});
        
    } catch (error) {
        return "failed";    
    }
    return "OK";
}

/*
function insert_temp_user(username, email, password, auth_code){
    
    client.connect(async function(err){
        if(!err){
            var db = client.db(dbname);
            
            var p = new Promise( (resolve, reject) => {
                resolve();
            });

            var p2 = await p.then(function() {

                db.collection('User').findOne({"email":email}, function(err, result){
                    if(!err){
                        console.log(result);
                        db.collection('TempUser').findOne({"email": email}, function(err, result){
                            console.log(result);
                        });
                    }
                });
            });

            var p3 = await p2.then(function() {
                
                db.collection('TempUser').insertOne({username: username, email: email, password: password, code:auth_code}, function(err, result) {
                    if(!err)
                        console.log("temp_user_insertion_success");
                    else
                        console.log("temp_user_insertion_failure : "+ err.message);
                    client.close();
                });
            });
        }
        else{
            client.close();
        }
            
            
    });
}
*/


module.exports.unique = function(email){
    client.connect(function(err){
        var db = client.db(dbname);
        db.collection("TempUser").findOne({"email":email});
    });
}
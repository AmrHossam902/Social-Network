const Mongoclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbname = 'social';
var client = new Mongoclient(url);

const EventEmitter = require('events');
var emitter = new EventEmitter();


function insert_temp_user(username, email, password, auth_code){
    client.connect(function(err){
        if(!err){
            var db = client.db(dbname);

            db.collection('TempUser').insertOne({username: username, email: email, password: password, code:auth_code}, function(err, result) {
                if(!err)
                    emitter.emit("temp_user_insertion_success", result.insertedId);
                else
                    emitter.emit("temp_user_insertion_failure");
                client.close();
            });
        }
        else
            client.close();
    });
}

function insert_valid_user(id, auth_code){
    client.connect(function(err){
        if(!err){
            var db = client.db(dbname);
            db.collection('TempUser').findOneAndDelete({"_id":id}, function(err, result) {
                if(auth_code == result.value.auth_code){
                    delete result.value.auth_code;
                    db.collection('User').insertOne(result.value, function (err, result) {
                        client.close();
                        if(!err)
                            emitter.emit("valid_user_insertion_success");
                        else
                            emitter.emit("valid_user_insertion_failed", err.message);
                    });
                }
                else{

                }
            });
        }
        else{
            client.close();
            emitter.emit(" DB connection failure", err.message);
        }
    });
}

client.connect(function(err){
    if(!err){
        
    }
});

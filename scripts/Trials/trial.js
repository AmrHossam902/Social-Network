const MongoClient = require('mongodb').MongoClient;

const dbname = 'social'
const url = 'mongodb://localhost:27017'
var client = new MongoClient(url);

client.connect(function (err) {
   var db = client.db(dbname);
   var id;
   db.collection("tempUser").insertOne({name:"amr"}, function(err2, r){
        id = r.insertedId;
        console.log(r.ops[0]);

        db.collection("tempUser").findOneAndDelete({_id: id}, function(err, result){
            console.log(result.value);
            result.value.added = "hossam";
            
            db.collection("User").insertOne(result.value, function(err2, result){
                console.log(result.ops[0]);
                client.close();
            });    
       });
   
    });
});

let mongo = require("mongodb").MongoClient;
//require the data file
let data = require("./data");

mongo.connect("mongodb://localhost:27017/test", function (err, db) {
    let robots = db.collection('robots');
    //collections (things that hold docs)
    //data.users is our users array
    for (let i = 0; i < data.users.length; i++) {
        //insert his user into the db
        robots.insert(data.users[i]);
    }
    db.close();
});


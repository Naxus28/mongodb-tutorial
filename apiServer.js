//NOTE: this file is a standalone server and not related to index.js
//these files do different things for demo on how to use the mongodb-node driver

let server = require('./routes/index.js');
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let url = 'mongodb://localhost:27017';
let dbName = 'learning_mongo';


MongoClient.connect(url, (err, client) => {
    assert.equal(null,err);
    console.log("connected correctly to server");
    collection = client.db(dbName).collection('tours');
    server.start((err) => {
        console.log('Hapi is listening to http://localhost:8080')
    })
})
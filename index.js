//NOTE: this file is a standalone server and not related to apiServer.js
//these files do different things for demo on how to use the mongodb-node driver

//http://mongodb.github.io/node-mongodb-native/3.0/
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'learning_mongo';

const findDocs = (client, callback) => {
   const db = client.db(dbName);

  //https://mongodb.github.io/node-mongodb-native/markdown-docs/collections.html
  let collection = db.collection('tours');

  //https://docs.mongodb.com/manual/reference/method/cursor.toArray/
  //The toArray() method returns an array that contains all the documents from a cursor. 
  //The method iterates completely the cursor, loading all the documents into RAM and exhausting the cursor.
  // and https://mongodb.github.io/node-mongodb-native/api-generated/cursor.html#toarray
  collection
    .find({tourLength: 3})
    .project({tourName: 1, _id: 0})
    .toArray((err, docs) => {
      if (err) console.log('err: ', err);

      console.log('docs: ', docs);
      callback();
  });
};

MongoClient.connect(url, (err, client) => {
   console.log('connected to DB');
   findDocs(client, () => client.close());
});
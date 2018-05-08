# mongodb tutorial [https://docs.mongodb.com/manual/introduction/](https://docs.mongodb.com/manual/introduction/)

## get MongoDB Compass (or robomongo)

MongoDB Compass is a GUI that allows you to interact with your databases. Once you open the GUI, use your database credentials to connect to your DBs.

[Download here](https://www.mongodb.com/download-center?_ga=2.1085937.15138774.1525100686-1997388355.1524597165#compass)

## Robomongo [https://robomongo.org/](https://robomongo.org/)

Robomongo is a GUI that allows us to interact with our mongdb database directly. 

After you start your mongodb (`mongod`) you can open the GUI and you should be able to see the dbs hosted on your system.


## Mongo Atlas [https://www.mongodb.com/cloud](https://www.mongodb.com/cloud)
Cloud based mongo service. 

1. Create your account

2. Create a free or paid cluster (cluster of servers) 

3. After cluster is created:

  • select the "security" tab and add an admin SCRAM user

  • whitelist the IPs that can connect to your cluster (you have an option to whitelist all IPs)


__Whitelist__
![whitelist](img/whitelist.png)

4. Under "overview" tab, click on "connect" to ge the code that connects with your cluster via mongo shell, via your app (ruby, node, java, python), or via mongo Compass.

__Connect panel__
![whitelist](img/connect.png)

__Connect app__
![whitelist](img/app.png)

__Connect shell__
![whitelist](img/shell.png)


## Create DB and insert data (check mongo methods on "loadMovieDetailsDataset.js")

1. cd into the directory where you have the data you want to insert on the DB

2. Make sure your .js file has the data and the right methods to insert that data where you need it.

3. Connect to your cluster or standalone DB -- you can connect to a local db if you want, just make sure you create it first via robomongo or via mongo shell (`use <dbName>` creates db and let's you interact with it).

4. run `load(<dbFileName.js>)`

This will create the new db as specified on the .js file you load (in this example, "video"). e.g.

__Load data__
![whitelist](img/loaddb.png)


## Common Shell Commands (https://docs.mongodb.com/manual/reference/mongo-shell/)[https://docs.mongodb.com/manual/reference/mongo-shell/]

```bash
show dbs // shows all dbs
use <dbName> // use db
show collections // shows all collections in the db
db.collectionName.find() // shows collection content
```

## Common Methods (https://docs.mongodb.com/manual/reference/mongo-shell/)[https://docs.mongodb.com/manual/reference/mongo-shell/]

__collection.insertOne()__
```bash
  use <dbName> // use this db

  #insert one document 
  # db refers to the db we selected in the step above
  db.collectionName.insertOne({someKey: "some val", someKey: "some val"})
```

__collection.insertMany()__
```bash
  use <dbName>

  #insert many documents 
  #this method inserts documents in order by default (if there is an error, documents stop being #inserted at that point--previously inserted documents are unaffected)
  #To ignore order and prevent errors from executing further into the query we can 
  #pass a second argument {ordered: false} after the documents to be inserted
  db.collectionName.insertMany([
    {someKey: "some val", someKey: "some val"},
    {someKey: "some val", someKey: "some val"}
  ])

    db.collectionName.insertMany([
      {someKey: "some val", someKey: "some val"},
      {someKey: "some val", someKey: "some val"}
    ], {
      ordered: false
    })
```

__collection.find()__
```bash
#find all
db.collectionName.find()
```

> When querying the DB we can use the `pretty()` method to display a formated json document
e.g. `db.collectionName.find().pretty()`


__collection.find({someKey: "someValue"})__ with filter
```bash
#find specific by key
db.collectionName.find({someKey: "someValue"}) (e.g. find({age: 14}))
```

__collection.find({someKey: "someValue"})__ with nested object filter
```bash
#find specific in nested obj
e.g

documents:

{
  id: ObjectId("11823081237"),
  name: "JD"
  profession: {
    title: "web engineer",
    experience: 12,
    currentCompany: {
      name: "Full Sail",
      field: "education"
    },
  },
  {
  id: ObjectId("11823081237"),
  name: "MD",
  profession: {
    title: "db engineer",
    experience: 3,
    currentCompany: {
      name: "UCF",
      field: "education"
    }
  }
}

#this query will return the two documents above
#need to put the key in quotes when it uses dot notation (in mongo shell)
db.collectionName.find({"profession.currentCompany.field": "education"}) 
```

__collection.find()__ arrays
```bash
#find in arrays
e.g.

#Person collection

 {
  id: ObjectId("11823081237"),
  name: "JD",
  salary: null,
  profession: {
    title: "web engineer",
    experience: 12,
    currentCompany: {
      name: "Full Sail",
      field: "education"
    },
    pastCompanies: [
      "Amazon",
      "Google",
      "IBM"
    ]
  },
  {
  id: ObjectId("11823081237"),
  name: "MD",
  salary: null,
  profession: {
    title: "db engineer",
    experience: 3,
    currentCompany: {
      name: "UCF",
      field: "education"
    },
    pastCompanies: [
      "Google",
      "Amazon",
      "Reddit"
    ]
  }
}


#We can search all users who have worked on a certain company:
db.collectionName.find({pastCompanies: "Google"})

#Who have worked on a multiple companies
db.collectionName.find({pastCompanies: ["Google", "Amazon"]}) #returns arrays where "Google" comes before "Amazon" so the first document above is not a match

#Who have worked on a certain company as long as it is in a specific position in the array (useful when array is ordered by some kind of hierarchy)
db.collectionName.find({"pastCompanies.0": "Google"}) #returns documents where "Google" is index 0 of "pastCompanies" array
```

__collection.find().count()__
```bash
collection.find({someKey: "someValue"}).count()
```

__collection.find().pretty()__
```bash
collection.find({someKey: "someValue"}).pretty()
```

__Projections__

Projections allow us to limit the fields we want our query to return.

Projections are specified as a second argument to the query. If the projection has a key with the value "1", that field is included in the query; if the value is 0, that field is excluded from the query


e.g.
```bash
#consider the Person collection above
#this query returns only the name field (and _id by default) of people whose experience value is 3

collection.find({experience: 3}, {name: 1})

#this query excludes the id from the results
collection.find({experience: 3}, {name: 1, _id: 0})


#this query returns all fields but name
collection.find({experience: 3}, {name: 0})
```

__collection.updateOne()__: $set

[update operators](https://docs.mongodb.com/manual/reference/operator/update/)

Finds a document by specified identifier and updates it. If there are multiple documents that match the identifier (say, {name: "Joe"}) mongo will only update the first document found.

We can update an existing field or add a new field

e.g.
```bash
#this query finds a person whose name is "JD" and adds an "age" field to the document
collection.updateOne({
  name: "JD"
},
{
  $set: {
    age: 34
  }
})

#this query finds a person whose name is "JD" and updates his name to "John Doe"
collection.updateOne({
  name: "JD"
},
{
  $set: {
    name: "John Doe"
  }
})

#this query finds a person whose name is "JD" and sets the prizes array to the document
collection.updateOne({
  name: "JD"
},
{
  $set: {
    prizes: [
      {
        name: "Best developer",
        amount: 1000
      },
      {
        name: "Best App",
        amount: 500
      },

    ]
  }
})
```
__collection.updateOne()__: [$inc](https://docs.mongodb.com/manual/reference/operator/update/inc/)

```bash
#experience will be incremented by 3
collection.updateOne({
  name: "JD"
},
{
  $inc: {
    experience: 3, #also takes negative numbers to decrement
  }
})
```

__collection.updateOne() with positional operator__: [$](https://docs.mongodb.com/manual/reference/operator/update/positional/)

To update the first element that matches the query in an array, use the positional $ operator if you do not know the position of the element in the array:

The first part of the query needs to have the unique identifier, the key pointing to the array, and the value that you want to update in that array.

```bash
#the first instance of "IBM" within "profession.pastCompanies" array will be updated to "LinkedIn"
collection.updateOne({
  name: "JD", "profession.pastCompanies": "IBM"
},
{
  $set: { 
    "profession.pastCompanies.$" : "LinkedIn" 
  } 
})
```


___collection.updateOne() with push__:[$push](https://docs.mongodb.com/manual/reference/operator/update/push/)

Creates a new array with item passed into it (single or object)

```bash
#this query creates a new key (family) whose value is an array whose first element is the "family" object below

collections.updateOne(
   { name: "JD" },
   {
     $push: {
       family: {
        mother: "Jen",
        father: "Trevor",
        wife: "Margaret",
        firstSon: "Jonathan",
        firstDaugher: "Maria"
       }
     }
   }
)


#so

{
  id: ObjectId("11823081237"),
  name: "JD"
  profession: {
    title: "web engineer",
    experience: 12,
    currentCompany: {
      name: "Full Sail",
      field: "education"
    },
    pastCompanies: [
      "Amazon",
      "Google",
      "IBM"
    ]
  },
  family: [
    {
      mother: "Jen",
      father: "Trevor",
      wife: "Margaret",
      firstSon: "Jonathan",
      firstDaugher: "Maria"
    }
  ]
},
```
___collection.updateOne() with push with $each__:[$push $each](https://docs.mongodb.com/manual/reference/operator/update/push/)
To push several individual objects at once we need to use the $each operator, otherwise all the objects would be inserted as the first element of the array

```bash
collections.updateOne(
 { name: "JD" },
 {
  $push: {
    friends: {
      $each: [
        {
          firstName: "Mark",
          lastName: "Smith",
        },
        {
          firstName: "Jeff",
          lastName: "Malone",
        },        
        {
          firstName: "Tara",
          lastName: "Sandbanks",
        }
      ]
    }      
  }
})
```


__collection.updateOne()__ [upsert](https://docs.mongodb.com/manual/reference/method/db.collection.update/)

The `upsert:true` key/pair can be passed as the third argument to the update query. On an update operation, if a query matches a document in the collection, that document (or the part specified) will be replaced with the one passed to $set. If the query doesn't match any document in the collection but the query has `upsert:true`, the document will be inserted.

```bash
let Mark = {
  firstName: "Mark",
  lastName: "Twain"
};


collection.updateOne({
    name: "Mark" #doesn't exist in our Person collection
  },
  {
    $set: Mark
  },  
  {
    upsert: true
  },
})
```


__collection.updateMany()__ [updateMany](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/)

`updateMany()` works very similarly to `updateOne()`, except that it updates all documents that are matched in the query.

Below we [$unset](https://docs.mongodb.com/manual/reference/operator/update/unset/) (remove) the field "salary" from all documents where "salary" is `null`

```bash
collection.updateMany({
  salary: null
  }, {
  $unset: {
    salary: "" #this value doesn't really matter 
  }
})
```

__collection.replaceOne()__ [replaceOne](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/)

Replaces the entire document matched on the query

```bash
let JD = {
  firstName: "Johnny",
  lastName: "Damon"
};

collection.replaceOne({
  name: "JD"
},
  JD
)
```








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


## Common Bash Commands (https://docs.mongodb.com/manual/reference/mongo-shell/)[https://docs.mongodb.com/manual/reference/mongo-shell/]

```bash
show dbs // shows all dbs
use <dbName> // use db
show collections // shows all collections in the db
db.collectionName.find() // shows collection content
```


## Common Methods (https://docs.mongodb.com/manual/reference/mongo-shell/)[https://docs.mongodb.com/manual/reference/mongo-shell/]


```bash
  use <dbName> // use this db

  #insert one document 
  # db refers to the db we selected in the step above
  db.collectionName.insertOne({someKey: "some val", someKey: "some val"})
```


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

```bash
#find all
db.collectionName.find()
```

> When querying the DB we can use the `pretty()` method to display a formated json document
e.g. `db.collectionName.find().pretty()`

```bash
#find specific by key
db.collectionName.find({someKey: "someValue"}) (e.g. find({age: 14}))
```

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

```bash
#find in arrays
e.g.

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
      "Google",
      "Amazon",
      "IBM"
    ]
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

#Who have worked on a multiple companies:
db.collectionName.find({pastCompanies: ["Google", "Amazon"]})

#Who have worked on a certain company as long as it is in a specific position in the array (useful when array is ordered by some kind of hierarchy)
db.collectionName.find({pastCompanies.0: "Google"}) #returns documents where "Google" is index 0 of "pastCompanies" array

```


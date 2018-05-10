boxOffice: [ { "country": "USA", "revenue": 228.4 },
             { "country": "Australia", "revenue": 19.6 },
             { "country": "UK", "revenue": 33.9 },
             { "country": "Germany", "revenue": 16.2 },
             { "country": "France", "revenue": 19.8 } ]

db.movieDetails.find({"boxOffice.country": "Germany", "boxOffice.revenue": {$gt: 17}})

db.movieDetails.find({"boxOffice.country": "Germany", "boxOffice.revenue": {$gt: 228}})


// connect to sandbox db and follow these steps
use video
martian = db.movieDetails.findOne({title: "The Martian"})
martian
delete martian._id;
martian
martian.boxOffice = [
    {"country": "USA", "revenue": 228.4},
    {"country": "Australia", "revenue": 19.6},
    {"country": "UK", "revenue": 33.9},
    {"country": "Germany", "revenue": 16.2},
    {"country": "France", "revenue": 19.8}
]
db.movieDetails.insertOne(martian);

db.movieDetails.find({boxOffice: {$elemMatch: {"country": "Germany", "revenue": {$gt: 17}}}})

db.movieDetails.find({boxOffice: {$elemMatch: {"country": "Germany", "revenue": {$gt: 16}}}})


// NOTE
// in a query such as the one below, the two elements specified in the
// filter DO NOT need to match in the same array element:
// one filter could match document x and the other could match in document y
// so the query below would match our boxOffice array even though there is no 
// single document where the country is Germany AND the revenue is greater than 17
db.movieDetails.find({"boxOffice.country": "Germany", "boxOffice.revenue": {$gt: 17}}).pretty()

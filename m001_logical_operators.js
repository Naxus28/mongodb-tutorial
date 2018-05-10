db.movieDetails.find({$or: [{"tomato.meter": {$gt: 95}},                               
                            {"metacritic": {$gt: 88}}]},
                     {_id: 0, title: 1, "tomato.meter": 1, "metacritic": 1})

// this query doesn't need "$and"
// the results are the same as the query just below
// when the query has more than one condition
// the "$and" operator is implied if the selector is different ("tomato.meter" != "metacritic")
// when the selector is the same the last one prevails and the filters are not combined
db.movieDetails.find({$and: [{"tomato.meter": {$gt: 95}},                               
                            {"metacritic": {$gt: 88}}]},
                     {_id: 0, title: 1, "tomato.meter": 1, "metacritic": 1})

db.movieDetails.find({"tomato.meter": {$gt: 95},                               
                      "metacritic": {$gt: 88}},
                     {_id: 0, title: 1, "tomato.meter": 1, "metacritic": 1})

// $ne stands for "not equal"
// this query returns documents where the "metacritic" field whose key is not "null"
// but actually that exists--remember {$ne: null} matches documents whose actual key value is "null"
// and documents where the key doesn't exist
// In this case we want the ones that exist and whose value is not "null"
db.movieDetails.find({$and: [{"metacritic": {$ne: null}},
                             {"metacritic": {$exists: true}}]},
                          {_id: 0, title: 1, "metacritic": 1})

// this query will not return anything because 
// filters are canceling each other out
db.movieDetails.find({$and: [{"metacritic": null},
                             {"metacritic": {$exists: true}}]},
                     {_id: 0, title: 1, "metacritic": 1})



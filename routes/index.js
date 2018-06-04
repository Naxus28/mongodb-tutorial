let assert = require('assert'),
      Hapi = require('hapi');

let server = new Hapi.Server({
  port: 8080, 
  host: 'localhost' 
});

server.route( [
    // Get tour list
    {
        method: 'GET',
        path: '/api/tours',
        config: {json: {space: 2}},
        handler: (request, h) => {
            let findObject = {};
            for (let key in request.query) {
                findObject[key] = request.query[key]
            }
            collection.find(findObject).toArray((error, tours) => {
                assert.equal(null,error);
                return tours;
            })
             return request;
        }
    },
    // Add new tour
    {
        method: 'POST',
        path: '/api/tours',
        handler: (request, h) => {
            return "Adding new tour";
        }
    },
    // Get a single tour
    {
        method: 'GET',
        path: '/api/tours/{name}',
        config: {json: {space: 2}},
        handler: (request, h) => {
            collection.findOne({"tourName":request.params.name}, (error, tour) => {
               assert.equal(null,error);
               return tour;
            })
        }
    },
    // Update a single tour
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: (request, h) => {
            // request.payload variables
            return "Updating " + request.params.name;
        }
    },
    // Delete a single tour
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: (request, h) => {
            return ("Deleting " + request.params.name).code(204);
        }
    },
    // Home page
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return "Hello world from Hapi/Mongo example."
        }
    }
]);

module.exports = server;

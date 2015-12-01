var pg = require('pg');
var Promise = require("node-promise").Promise;
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wedding';

exports.insert = function(data){
  try{
    console.log('starting insert.');

    var results = [];
    var promise = new Promise();

    pg.connect(connectionString, function(err, client, done) {
        console.log('starting pg connect for insert.');

        if(err) {
          processError(done, err);
        }

        client.query(
          "INSERT INTO Venue(Name, CeremonyTime, Description, DateModified, DateCreated, UserId, IsActive) values($1, $2, $3, $4, $5, $6, $7)",
          [data.name, data.ceremonyTime, data.description, data.dateModified, data.dateCreated, data.userId, true]
        );

        var query = client.query("select * from Venue where IsActive = true");

        // Stream results back one row at a time
        query.on('row', function(row) {
            console.log('pushing row for insert.');
            results.push(row);
        });

        query.on('end', function() {
            console.log('starting process query end for insert.');
            promise.resolve(processQueryEnd(done, results));
        });
    });
  }
  catch(ex){
    console.log('Exception running query with psql: ' + ex);
  }

  return promise;
}

exports.get = function(){
  console.log('db get for venue.');
  var results = [];
  var promise = new Promise();
  console.log('promise: ' + promise);
  console.log('pg: ' + pg);
  console.log('connection string: ' + connectionString);

  try{
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          processError(done, err);
        }

        console.log('running query.');

        var query = client.query("select * from Venue where IsActive = true");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
          var venue = processQueryEnd(done, results);
          console.log('venue returned in end query. venue: ' + venue);
          console.log('venue returned in end query. venue.name: ' + venue.name);
          promise.resolve(venue);
        });
    });
  }
  catch(ex){
    console.log('Exception running query with psql: ' + ex);
  }

  return promise;
}

var processQueryEnd = function(done, results){
  done();

  if(results.length > 1){
    throw "Venue record set has more than one record returned from the query.";
  }

  console.log('returning result record in processQueryEnd.');
  console.log('results.length: ' + results.length);
  console.log('returning result record, Name: ' + results[0].name);

  return results[0];
}

var processError = function(done, err){
  done();
  console.log(err);
  throw err;
}

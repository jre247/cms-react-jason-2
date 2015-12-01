var pg = require('pg');
var Promise = require("node-promise").Promise;
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wedding';

exports.insert = function(data){
  try{
    var results = [];
    var promise = new Promise();

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          processError(done, err);
        }

        client.query(
          "INSERT INTO Venue(Name, CeremonyTime, Description, DateModified, DateCreated, User, IsActive) values($1, $2, $3, $4, $5, $6, $7)",
          [data.VenueName, data.CeremonyTime, data.Description, data.DateModified, data.DateCreated, data.User, data.IsActive]
        );

        var query = client.query("select * from Venue where IsActive = 1");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            return processQueryEnd(done, results);
        });

        setupQueryProcessingEvents(query, results, done);
    });
  }
  catch(ex){
    console.log('Exception running query with psql: ' + ex);
  }
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
          promise.resolve(processQueryEnd(done, results));
        });
    });
  }
  catch(ex){
    console.log('Exception running query with psql: ' + ex);
  }

  return promise.promise;


}

var processQueryEnd = function(done, results){
  done();

  if(results.length > 1){
    throw "Venue record set has more than one record returned from the query.";
  }

  return results[0];
}

var processError = function(done, err){
  done();
  console.log(err);
  throw err;
}

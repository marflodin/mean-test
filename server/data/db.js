var MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    async = require('async'),
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/recipesapp';

var _db;


exports.init_db = function (callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to MongoDB server.");
        _db = db;

        // Got the connection, now get the ski_resorts collection. It's easy.
        exports.ski_resorts = _db.collection("ski_resorts");
        callback(null);
    });
}    

// Anybody can just grab this and start making queries on it if they want.
exports.ski_resorts = null;

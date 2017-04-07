
var db = require("./db.js"),
    async = require('async');

/**
 *  start, number, callback 
 *  start, number, ordervals, callback 
 *  filterfieldvals, start, number, ordervals, callback 
 */
exports.list_ski_resorts = function () {
    var start, number, callback, ordervals, filterfieldvals;

    switch (arguments.length) {
      case 3:
        start = arguments[0];
        number = arguments[1];
        callback = arguments[2];
        break;
      case 4:
        start = arguments[0];
        number = arguments[1];
        ordervals = arguments[2];
        callback = arguments[3];
        break;
      case 5:
        filterfieldvals = arguments[0];
        start = arguments[1];
        number = arguments[2];
        ordervals = arguments[3];
        callback = arguments[4];
        break;
      default:
        throw new Error("This is not a valid use");
    }

    var filter = filterfieldvals ? filterfieldvals : {};
    var output = [];
    var orderby = ordervals ? ordervals : { name : 1 };

    var cursor = db.ski_resorts.find(filter)
        .sort(orderby)
        .skip(start)
        .limit(number);

    cursor.on("data", function (ski_resort) {
        output.push(ski_resort);
    });
    cursor.once("end", function () {
        callback(null, output);
    });
};

/**
 * mandatory fields:
 *
 *     name: strin
 *     type: string
 *     summary: string
 *
 * also:
 *
 *     serves: int
 *     preparation_time: int
 *     cooking_time: int
 *     ingredients: [ string, ... ]
 *     preparation: string
 *
 * we add recipe_id in our database code.
 */
exports.add_ski_resort = function (ski_resort_data, callback) {
    try {
        if (!ski_resort_data.name) throw new Error("missing_name");
        if (!ski_resort_data.type) throw new Error("missing_type");
        if (!ski_resort_data.summary) throw new Error("missing_summary");
    } catch (e) {
        callback({ error: e.message, message: "This is not a valid recipe."});
    }

    async.waterfall([
        // get a unique id for this new recipe.
        function (cb) {
            get_unique_ski_resort_id(ski_resort_data, cb);
        },
        // pass it on to the database.
        function (ski_resort_data, cb) {
            console.log("did i get a recipeid?" + ski_resort_id);
            ski_resort_data = JSON.parse(JSON.stringify(ski_resort_data));
            ski_resort_data.ski_resort_id = ski_resort_id;

            db.ski_resorts.insertOne(ski_resort_data, { w: 1 }, cb);
        },
    ], function (err, results) {
        callback(err, results);
    });
};

exports.get_ski_resort_by_id = function (ski_resort_id, callback) {
    var found_ski_resort = null;
    
    var cursor = db.ski_resort.find({ ski_resort_id: ski_resort_id }).limit(1);
    cursor.on("data", function (ski_resort) {
      found_ski_resort = ski_resort;
    });
    cursor.on("end", function () {
        console.log(JSON.stringify(found_ski_resort, null, 3));
        callback(null, found_ski_resort);
    });
};



/**
 * helper function to generate a ski_resort_id for us.
 */
function get_unique_ski_resort_id (ski_resort_data, callback) {
    if (!ski_resort_data.name) {
        return undefined;
    }

    var ok = false;

    var proposed_id = ski_resort_data.name.split(" ").join("_");

    async.doUntil(
        function (cb) {
            proposed_id += "" + (new Date().getTime());

            // only set this to true if we see a ski_resort!
            ok = true;
            var cursor = db.ski_resort.find({ ski_resort_id: proposed_id }).limit(1);
            cursor.on("data", function (ski_resort) {
                console.log("I got a ski_resort.....");
                if (ski_resort) {
                    ok = false;
                }
            });
            cursor.once("end", function () {
                console.log("Im done.....");
                cb(null);
            });
        },
        function () {
            console.log("QUeried about OK: " + ok);
            return ok;
        },
        function (err, results) {
            callback(err, proposed_id);
        });
    
};

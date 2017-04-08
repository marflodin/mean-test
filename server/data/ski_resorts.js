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

exports.get_ski_resort_by_id = function (ski_resort_id, callback) {
    var found_ski_resort = null;
    
    var cursor = db.ski_resorts.find({ ski_resort_id: ski_resort_id }).limit(1);
    cursor.on("data", function (ski_resort) {
      found_ski_resort = ski_resort;
    });
    cursor.on("end", function () {
        console.log(JSON.stringify(found_ski_resort, null, 3));
        callback(null, found_ski_resort);
    });
};
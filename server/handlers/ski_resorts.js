
var ski_resort_data = require("../data/ski_resorts.js");


/**
 *  start, number, callback 
 *  start, number, ordervals, callback 
 *  filterfieldvals, start, number, ordervals, callback 
 */
exports.get_ski_resorts = function () {
    ski_resort_data.list_ski_resorts.apply(this, arguments);
};

exports.add_ski_resort = function (ski_resort, callback) {
    ski_resort_data.add_ski_resort(ski_resort, callback);
};

exports.get_ski_resort_by_id = function (ski_resort_id, callback) {
    ski_resort_data.get_ski_resort_by_id(ski_resort_id, callback);
}

var ski_resort_data = require("../data/ski_resorts.js");

exports.get_ski_resorts = function () {
    ski_resort_data.list_ski_resorts.apply(this, arguments);
};

exports.get_ski_resort_by_id = function (ski_resort_id, callback) {
    ski_resort_data.get_ski_resort_by_id(ski_resort_id, callback);
};

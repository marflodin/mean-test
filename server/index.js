var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  ski_resort_handler = require("./handlers/ski_resorts.js"),
  db = require("./data/db.js"),
  async = require("async");

var _port = 8082;
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../static"));

app.get("/v1/ski_resorts.json", function (req, res) {
  var start = req.query.start ? parseInt(req.query.start) : 0;
  var pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 100;

  ski_resort_handler.get_ski_resorts(start, pageSize, function (err, ski_resorts) {
    if (err) {
      return send_error_resp(res, err);
    } else {
      return send_success_resp(res, ski_resorts);
    }
  });
});

app.get("/v1/ski_resorts/:ski_resort_id.json", function (req, res) {
  ski_resort_handler.get_ski_resort_by_id(req.params.ski_resort_id, function (err, ski_resort) {
    if (err) {
      return send_error_resp(res, err);
    } else if (!ski_resort) {
      return send_error_resp(res, 400, "no_such_ski_resort",
        "That does not appear to be an existing ski_resort in our database.");
    } else {
      send_success_resp(res, ski_resort);
    }
  });
});

app.put("/v1/ski_resorts.json", function (req, res) {
  var rid = get_unique_ski_resort_id(req.body);

  try {
    if (!req.body.name) throw new Error("missing_name");
    if (!req.body.type) throw new Error("missing_type");
    if (!req.body.summary) throw new Error("missing_summary");
  } catch (e) {
    return send_error_resp(res, 400, e.message, "You sent us an invalid ski_resort.");
  }

  req.body.ski_resort_id = rid;
  ski_resorts.push(JSON.parse(JSON.stringify(req.body)));
  send_success_resp(res, req.body);
});

db.init_db(function (err) {
  if (err) {
    console.error("Error initialising DB, aborting: " + JSON.stringify(err, 0, 2));
    exit(-1);
  } else {
    console.log("Starting Server.");
    app.listen(_port);
  }
});


/**
 * res, http_status, code, message
 * res, http_status, err obj
 * res, err obj
 */
function send_error_resp() {
  var res, http_status, code, message;
  if (arguments.length == 4) {
    res = arguments[0];
    http_status = arguments[1];
    code = arguments[2];
    message = arguments[3];
  } else if (arguments.length == 3) {
    res = arguments[0];
    http_status = arguments[1];
    code = arguments[2].error;
    message = arguments[2].message;
  } else if (arguments.length == 2) {
    res = arguments[0];
    http_status = _http_code_from_error(arguments[1].error);
    code = arguments[1].error;
    message = arguments[1].message;
  } else {
    console.error("send_error_resp: YOU'RE DOING IT WRONG");
    throw new Error("send_error_resp called wrong-est-ly");
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(http_status).send(JSON.stringify({error: code, message: message}));
  res.end();
}

function send_success_resp(res, obj) {
  if (arguments.length != 2) {
    console.error("send_success_resp: YOU'RE DOING IT WRONG");
    throw new Error();
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(obj));
  res.end();
}


function _http_code_from_error(error_code) {
  switch (error_code) {
    // add other messages here when they're not server problems.
    default:
      return 503;
  }
}


// This would be more efficient w hashing instead of array iteration, but
// we're moving this to a database in a few minutes anyway, so no worries.
function get_unique_ski_resort_id(ski_resort_data) {
  if (!ski_resort_data.name) {
    return undefined;
  }

  var proposed_id = ski_resort_data.name.split(" ").join("_") + "" + (new Date().getTime());
  var unique = false;
  while (!unique) {
    var i;
    for (i = 0; i < ski_resorts.length; i++) {
      if (ski_resorts[i].ski_resort_id == proposed_id) {
        break;
      }
    }

    if (i == ski_resorts.length) {
      unique = true;
    } else {
      proposed_id = proposed_id + "" + (new Date().getTime());
    }
  }
  return proposed_id;
}

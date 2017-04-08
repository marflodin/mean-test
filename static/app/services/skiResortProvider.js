(function () {

  function skiResortProvider($http) {

    this._server_host = "";

    this.getAllSkiResorts = function (callback) {
      $http.get(this._server_host + "/v1/ski_resorts.json")
        .success(function (data, status, headers, conf) {
          callback(null, data);
        })
        .error(function (data, status, headers, conf) {
          callback(data);
        });
    };

    this.getSkiResortById = function (ski_resort_id, callback) {
      $http.get(this._server_host + "/v1/ski_resorts/" + ski_resort_id + ".json")
        .success(function (data, status, headers, conf) {
          callback(null, data);
        })
        .error(function (data, status, headers, conf) {
          callback(data);
        });
    };

  }

  skiResortsApp.service("skiResortProvider", ["$http", skiResortProvider]);

})();

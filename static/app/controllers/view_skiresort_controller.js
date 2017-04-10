(function () {

  // 1. declare our controller.
  function ViewSkiResortController($scope, $routeParams, skiResortProvider) {

    $scope.finished_loading = false;
    $scope.page_load_error = null;

    skiResortProvider.getSkiResortById($routeParams.ski_resort_id, function (err, ski_resort) {
      $scope.finished_loading = true;
      if (err) {
        $scope.page_load_error = "Unable to load recipe: " + JSON.stringify(err);
      } else {
        $scope.ski_resort = ski_resort;
      }
    });

    $scope.calculateAverage = function(ratings){
      var sum = 0;
      if ("undefined" === typeof ratings || ratings.length == 0) {
        console.log("variable is undefined, or no ratings has been added");
        return new Array(1);
      }
      console.log("ratings: " + ratings);
      for(var i = 0; i < ratings.length; i++){
        console.log("rating: " + ratings[i].score);
        sum += parseInt(ratings[i].score, 10); //don't forget to add the base
      }
      var avg = sum/ratings.length;
      return new Array(avg);
    };

    $scope.getNumber = function(num) {
      return new Array(num);
    }
  }

  // 2. create the controller and give it $scope.
  skiResortsApp.controller("ViewSkiResortController", ['$scope', '$routeParams', 'skiResortProvider', ViewSkiResortController]);

})();

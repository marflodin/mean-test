(function () {

  // 1. declare our controller.
  function SkiResortsController($scope, skiResortProvider) {

    $scope.add_ski_resort_error = null;

    $scope.page_load_error = null;
    $scope.finished_loading = false;

    function get_recipes() {
      $scope.ski_resorts = skiResortProvider.getAllSkiResorts(function (err, ski_resorts) {
        $scope.finished_loading = true;
        if (err) {
          $scope.page_load_error = err.message;
        } else {
          $scope.ski_resorts = ski_resorts;
        }
      });
    }

    get_recipes();

    $scope.getNumber = function(num) {
      return new Array(num);
    };

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
  }

  // 2. create the controller and give it $scope.
  skiResortsApp.controller("SkiResortsController", ['$scope', 'skiResortProvider', SkiResortsController]);

})();

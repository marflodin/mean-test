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
  }

  // 2. create the controller and give it $scope.
  skiResortsApp.controller("SkiResortsController", ['$scope', 'skiResortProvider', SkiResortsController]);

})();

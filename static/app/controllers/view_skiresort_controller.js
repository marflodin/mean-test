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
  }

  // 2. create the controller and give it $scope.
  skiResortsApp.controller("ViewSkiResortController", ['$scope', '$routeParams', 'skiResortProvider', ViewSkiResortController]);

})();

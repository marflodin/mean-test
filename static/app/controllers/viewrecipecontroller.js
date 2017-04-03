(function () {

  // 1. declare our controller.
  function ViewRecipeController($scope, $routeParams, recipeProvider) {

    $scope.finished_loading = false;
    $scope.page_load_error = null;

    recipeProvider.getSkiResortById($routeParams.ski_resort_id, function (err, ski_resort) {
      $scope.finished_loading = true;
      if (err) {
        $scope.page_load_error = "Unable to load recipe: " + JSON.stringify(err);
      } else {
        $scope.ski_resort = ski_resort;
      }
    });
  }

  // 2. create the controller and give it $scope.
  recipesApp.controller("ViewRecipeController", ['$scope', '$routeParams', 'recipeProvider', ViewRecipeController]);

})();

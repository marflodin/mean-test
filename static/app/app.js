var skiResortsApp = angular.module("skiResortsApp", ["ngRoute"]);

skiResortsApp.config(function ($routeProvider) {
  $routeProvider
    .when("/ski_resorts", {controller: "SkiResortsController", templateUrl: "/app/partials/recipe_list.html"})
    .when("/ski_resorts/:ski_resort_id", {controller: "ViewSkiResortController", templateUrl: "/app/partials/view_recipe.html"})
    .when("/", {redirectTo: "/ski_resorts"})
    .otherwise({templateUrl: "/app/partials/404_page.html"});
});

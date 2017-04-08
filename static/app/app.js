var skiResortsApp = angular.module("skiResortsApp", ["ngRoute"]);

skiResortsApp.config(function ($routeProvider) {
  $routeProvider
    .when("/ski_resorts", {controller: "SkiResortsController", templateUrl: "/app/partials/ski_resort_list.html"})
    .when("/ski_resorts/:ski_resort_id", {controller: "ViewSkiResortController", templateUrl: "/app/partials/view_ski_resort.html"})
    .when("/", {redirectTo: "/ski_resorts"})
    .otherwise({templateUrl: "/app/partials/404_page.html"});
});

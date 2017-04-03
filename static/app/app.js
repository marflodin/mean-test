var recipesApp = angular.module("recipesApp", ["ngRoute"]);

recipesApp.config(function ($routeProvider) {
  $routeProvider
    .when("/ski_resorts", {controller: "RecipeListController", templateUrl: "/app/partials/recipe_list.html"})
    .when("/ski_resorts/:ski_resort_id", {controller: "ViewRecipeController", templateUrl: "/app/partials/view_recipe.html"})
    .when("/", {redirectTo: "/ski_resorts"})
    .otherwise({templateUrl: "/app/partials/404_page.html"});
});

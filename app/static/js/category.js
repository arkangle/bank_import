var app = angular.module('CategoryApp',['ngRoute']);
app.service('CategoryService',function ($http,$location) {
  this.getCategories = function () {
    return $http.get("/api/categories")
                .then(function(response) {
                  return response.data;
                });
  }
  this.getCategory = function(category_id) {
    return $http.get("/api/category/" + category_id)
                .then(function(response) {
                  return response.data;
                },function (response) {
                  $location.path("/");
                });
  }
  this.updateCategory = function(category) {
    return $http.put("/api/category/" + category.id,category)
                .then(function(response) {
                  $location.path("/");
                },function (response) {
                  $location.path("/");
                });
  }
  this.createCategory = function(category) {
    return $http.post("/api/category",category)
                .then(function(response) {
                  $location.path("/");
                },function (response) {
                  $location.path("/");
                });
  }
  this.deleteCategory = function(category_id) {
    return $http.delete("/api/category/" + category_id)
                .then(function(response) {
                  $location.path("/deleted");
                },function (response) {
                  $location.path("/deleted");
                });
  }
});
app.controller('CategoryListCtrl',function($scope,CategoryService) {
  CategoryService.getCategories().then(function (response) {
          $scope.categories = response.categories;
        });

  $scope.deleteCategory = function(category_id) {
    CategoryService.deleteCategory(category_id);
  }
});
app.controller('CategoryEditFormCtrl',function($scope,$location,CategoryService,category) {
  $scope.category = category.category;
  $scope.cancelForm = function() {
    $location.path("/");
  }
  $scope.saveCategory = function(category) {
    CategoryService.updateCategory(category);
  }
});
app.controller('CategoryAddFormCtrl',function($scope,$location,CategoryService) {
  $scope.cancelForm = function() {
    $location.path("/");
  }
  $scope.saveCategory = function(category) {
    CategoryService.createCategory(category);
  }
});
app.config(['$routeProvider',function($routeProvider) {
$routeProvider
.when('/', {
        templateUrl: 'static/categories/list.html',
        controller: 'CategoryListCtrl'})
.when('/add-category', {
        templateUrl: 'static/categories/form.html',
        controller: 'CategoryAddFormCtrl'})
.when('/edit-category/:category_id', {
        templateUrl: 'static/categories/form.html',
        controller: 'CategoryEditFormCtrl',
        resolve: {
          category: function(CategoryService,$route) {
            return CategoryService.getCategory($route.current.params.category_id);
        }}})
.otherwise({redirectTo:'/'});
}]);

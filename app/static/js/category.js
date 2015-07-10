var app = angular.module('CategoryApp',['ngRoute']);
app.service('CategoryService',function ($http) {
  this.getCategories = function () {
    return $http.get("/api/categories");
  }
  this.getCategory = function(category_id) {
    return $http.get("/api/category/" + category_id);
  }
  this.updateCategory = function(category) {
    return $http.put("/api/category/" + category.id,category);
  }
  this.createCategory = function(category) {
    return $http.post("/api/category",category);
  }
  this.deleteCategory = function(category_id) {
    return $http.delete("/api/category/" + category_id)
  }
});
app.controller('CategoryListCtrl',function($scope,$location,CategoryService) {
  CategoryService.getCategories().then(function (response) {
          $scope.categories = response.data.categories;
        });

  $scope.deleteCategory = function(category_id) {
    CategoryService.deleteCategory(category_id)
                .then(function(response) {
                  $location.path("/deleted");
                },function (response) {
                  $location.path("/deleted");
                });
  }
});
app.controller('CategoryEditFormCtrl',function($scope,$location,CategoryService,category) {
  $scope.category = category.category;
  $scope.cancelForm = function() {
    $location.path("/");
  }
  $scope.saveCategory = function(category) {
    CategoryService.updateCategory(category)
                .then(function(response) {
                  $location.path("/");
                },function (response) {
                  $location.path("/");
                });
  }
});
app.controller('CategoryAddFormCtrl',function($scope,$location,CategoryService) {
  $scope.cancelForm = function() {
    $location.path("/");
  }
  $scope.saveCategory = function(category) {
    CategoryService.createCategory(category)
                .then(function(response) {
                  $location.path("/");
                },function (response) {
                  $location.path("/");
                });
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
            return CategoryService.getCategory($route.current.params.category_id)
                        .then(function(response) {
                          return response.data;
                        },function (response) {
                          $location.path("/");
                        });
        }}})
.otherwise({redirectTo:'/'});
}]);

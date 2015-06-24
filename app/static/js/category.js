var app = angular.module('CategoryApp',[]);
app.controller('CategoryController',function($scope,$http) {
  $http.get("/api/categories")
        .success(function(response) { $scope.categories = response.categories; });
});

var app = angular.module('CategoryApp',[]);
app.controller('CategoryListCtrl',function($scope,$http) {
  $http.get("/api/categories")
        .success(function(response) { $scope.categories = response.categories; });
});

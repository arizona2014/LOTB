'use strict';

/**
 * @ngdoc function
 * @name xbApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xbApp
 */
angular.module('xbApp')
  .controller('MainCtrl', function ($scope, $http, localStorageService) {

    function submitBooks(key, val) {
      return localStorageService.set(key, val);
    };

    function getItem(key) {
      return localStorageService.get(key);
    };
	
    $scope.getAllBooks = function() {
      $http.get('http://henri-potier.xebia.fr/books').
        success(function(data) {
          $scope.books = data;
        });
    };

    $scope.addToCart = function( aBook ){
      $scope.selectedBooks.push( aBook );
      submitBooks('selectedBooks', $scope.selectedBooks);
    };	

    $scope.books = [];
    $scope.lsBooks = getItem('selectedBooks');

    if($scope.lsBooks === undefined || $scope.lsBooks === null)
        $scope.selectedBooks = [];
    else
        $scope.selectedBooks = $scope.lsBooks;
	
    $scope.getAllBooks();

  });

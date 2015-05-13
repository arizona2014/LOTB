'use strict';

/**
 * @ngdoc function
 * @name xbApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xbApp
 */
angular.module('xbApp')
  .controller('CartCtrl', function ($scope, $http, localStorageService) {

    function getItem(key) {
      return localStorageService.get(key);
    };

    function clearAll() {
      return localStorageService.clearAll();
    };

    function getIsbns(listOfBooks) {
      var theIsbn = '';
      angular.forEach(listOfBooks, function(book) {
        theIsbn += book.isbn + ',';
      });
      return theIsbn;
    };
	
	function initialize(){
      $scope.booksNo = 0;
      $scope.totalPrice = 0.0;
      $scope.proposedPrice = 0.0;		
	};
	
    $scope.getComercialOffers = function() {
      var urlFront = 'http://henri-potier.xebia.fr/books/';
      var urlEnd = '/commercialOffers';
      var isbns = getIsbns($scope.books);
      $http.get(urlFront + isbns + urlEnd).
        success(function(data) {
          var reduction = 0;
          for(var i=0; i<data.offers.length;i++)
          {
            if(data.offers[i].value > reduction)
              reduction = data.offers[i].value;
          }
          $scope.proposedPrice = ( $scope.totalPrice - reduction );
        });
    };

    $scope.getSelectedBooks = function() {
      $scope.books = getItem('selectedBooks');
      if($scope.books !== null)
      {
        $scope.booksNo = $scope.books.length;
        angular.forEach($scope.books, function(book) {
          $scope.totalPrice += book.price;
        });
        $scope.getComercialOffers();
      }
    };

    $scope.removeAll = function() {
      clearAll();
      $scope.books = getItem('selectedBooks');
	  initialize();
    };	

    $scope.books = [];
    initialize();
    $scope.getSelectedBooks();

  });

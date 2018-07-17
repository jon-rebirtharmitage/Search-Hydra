'use strict';

angular.module('app').controller('todoCtrl', function ($scope, todoStorage) {

    $scope.todoStorage = todoStorage;
	$scope.selectedText = "";
	$scope.percentage = 0;
	
	// Get Background Page to get selectedText from it's scope
	let bgPage = chrome.extension.getBackgroundPage();
	let selectedText = bgPage.selectedText;
	$scope.selectedText = selectedText;

    $scope.$watch('todoStorage.data', function() {
        $scope.todoList = $scope.todoStorage.data;
    });

    $scope.todoStorage.findAll(function(data){
        $scope.todoList = data;
        $scope.$apply();
    });

    $scope.add = function() {
        todoStorage.add($scope.newContent);
        $scope.newContent = '';
    }

	$scope.find = function(todo) {
        todoStorage.find(selectedText);
    }	
	
    $scope.remove = function(todo) {
        todoStorage.remove(todo);
    }

    $scope.removeAll = function() {
        todoStorage.removeAll();
    }

    $scope.toggleCompleted = function() {
        todoStorage.sync();
    }
});
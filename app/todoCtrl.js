'use strict';

angular.module('app').controller('todoCtrl', function ($scope, todoStorage) {
	$scope.selectedText = "";
    $scope.todoStorage = todoStorage;
	
	let bgPage = chrome.extension.getBackgroundPage();
	let selectedText = bgPage.selectedText;
	$scope.selectedText = selectedText;

	if(selectedText.length > 0) {
		alert(selectedText);
	}

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

	$scope.find = function() {
        todoStorage.find($scope.selectedText);
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
// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){
	
	$scope.queryAllTuna = function(){

		appFactory.queryAllTuna(function(data){
			var array = [];
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				array.push(data[i].Record);
			}
			array.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
			$scope.all_tuna = array;
		});
	}

	$scope.queryTuna = function(){

		var id = $scope.tuna_id;

		appFactory.queryTuna(id, function(data){
			$scope.query_tuna = data;

			if ($scope.query_tuna == "Could not locate tuna"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.recordTuna = function(){

		appFactory.recordTuna($scope.tuna, function(data){
			$scope.create_tuna = data;
			$("#success_create").show();
		});
	}

	$scope.changeHolder = function(){

		appFactory.changeHolder($scope.holder, function(data){
			$scope.change_holder = data;
			if ($scope.change_holder == "Error: no tuna catch found"){
				$("#error_holder").show();
				$("#success_holder").hide();
			} else{
				$("#success_holder").show();
				$("#error_holder").hide();
			}
		});
	}

});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

	factory.initOrg = function(data, callback){
		$http.post('http://18.136.205.13/api/v1/orgs', data).success(function(output){
			callback(output)
		});
	}

	factory.createLog = function(data, callback){
		
		$http.post('http://18.136.205.13/api/v1/logs', data).success(function(output){
			callback(output)
		});
	}

	// factory.createAuditAction = function(data, callback){		
	// 	$http.post('http://18.136.205.13/api/v1/logs'+tuna).success(function(output){
	// 		callback(output)
	// 	});
	// }

    factory.queryAllLogs = function(callback){
    	$http.get('http://18.136.205.13/api/v1/logs').success(function(output){
			callback(output)
		});
	}

	// factory.queryLogsBySC = function(id, callback){
    // 	$http.get('/get_tuna/'+id).success(function(output){
	// 		callback(output)
	// 	});
	// }

	// factory.queryLogsByProduct = function(id, callback){
    // 	$http.get('/get_tuna/'+id).success(function(output){
	// 		callback(output)
	// 	});
	// }

	return factory;
});



angular.module('stockApp',[]).controller('stockController',function ($scope, $http){

	$scope.getStocks = function(){
		var encodedTickers = encodeURIComponent($scope.userStocks);
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+encodedTickers+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		
		$http.get(url).success(function (stockData){

			if($scope.userStocks.indexOf(',') === -1){
				listOfStocks = [stockData.query.results.quote];
			}else{
				listOfStocks = stockData.query.results.quote;
			}
			$scope.listOfStocks = listOfStocks;
		
			// $scope.loadStock = function ($scope)
		})
	}
	$scope.loadStock = function (stockData){
		$scope.dataList = [];

		for(name in stockData){
			$scope.dataList.push({
				prop: name,
				val: stockData[name]
			})
		}
	}
	$scope.getChangeClass = function (change){
		if(change.indexOf('+') > -1){
			return 'change-positive';
		}else if(change.indexOf('-') > -1){
			return 'change-negative';
		}


	}

})
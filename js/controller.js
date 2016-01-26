angular.module('stockApp',[]).controller('stockController',function ($scope, $http){

	$scope.getStocks = function(){
		var encodedTickers = encodeURIComponent($scope.userStocks);
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+encodedTickers+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		
		$http.get(url).success(function (stockData){
			if($scope.userStocks.indexOf(',') < 0){
				listOfStocks = [stockData.query.results.quote];
			}else{
				listOfStocks = stockData.query.results.quote;
			}
			$scope.listOfStocks = listOfStocks;
		
		// 	// $scope.loadStock = function ($scope)
		})
		$('#search-bar').val('');
	}
	$scope.loadStock = function (stockData){
		$scope.dataList = [];
		for(name in stockData){
			if(stockData[name] != null){
				$scope.dataList.push({
					prop: name,
					val: stockData[name]
				})
			}
		}
		getChart(stockData);
		$('.stock-container').removeClass('active');
		$('#'+this.stock.Symbol).addClass('active');
	}
	function getChart(stockData){
		$scope.image1 = 'http://chart.finance.yahoo.com/z?s='+stockData.Symbol+'&t=3m&q=l&l=on&z=s&p=m10,m100';
		$scope.image2 = 'http://chart.finance.yahoo.com/z?s='+stockData.Symbol+'&t=1ym&q=l&l=on&z=s&p=m50,m200';
	}
	$scope.getChangeClass = function (change){
		if(change.indexOf('+') > -1){
			return 'change-positive';
		}else if(change.indexOf('-') > -1){
			return 'change-negative';
		}


	}

})
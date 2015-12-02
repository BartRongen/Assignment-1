var app = angular.module('WeatherApp', [])

app.factory('weather', ['$http', function($http) { 
  return $http.get('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=0bab358f3868166c4fe2006fc0b415d0') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);

app.controller('MainController', ['$scope', 'weather', function($scope, weather) {
  weather.success(function(data) {
	$scope.weatherdata = new Array();
	$scope.cleararray = function() {
		$scope.weatherdata = new Array();
		$scope.$apply();
	};
	$scope.datatransferred = function(data, index) {
		data.main.temp = Math.round(data.main.temp);
		data.wind.speed = transferToPower(data.wind.speed);
		console.log(data.wind.deg);
		data.wind.degicon = 'wind-dart-' + Math.floor((Number(data.wind.deg)+22.5)/45) + '.png';
		console.log(data.wind.degicon);
		data.weather[0].icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
		data.index = index;
		$scope.weatherdata.push(data);
		$scope.$apply();
	};
	$scope.remove = function(index, manualchange){
		removeMarker(index);
		$scope.weatherdata.splice(index,1);
		for (n=index;n<$scope.weatherdata.length;n++){
			$scope.weatherdata[n].index--;
		}
		if (manualchange){
			$scope.$apply();
		}
	};
  });
}]);

app.directive('weatherInfo', function() {
  return {
	restrict: 'E',
	scope: {
      info: '='
    },
	templateUrl: './directory/weather-info.html'
	}
});


function transferToPower(speed){
	if (speed >= 0 && speed <= 0.2){
		return 0;
	} else if (speed > 0.2 && speed <= 1.5){
		return 1;
	} else if (speed > 1.5 && speed <=3.3){
		return 2;
	} else if (speed > 3.3 && speed <=5.4){
		return 3;
	} else if (speed > 5.4 && speed <=7.9){
		return 4;
	} else if (speed > 7.9 && speed <= 10.7){
		return 5;
	} else if (speed > 10.7 && speed <= 13.8){
		return 6;
	} else if (speed > 13.8 && speed <=17.1){
		return 7;
	} else if (speed > 17.1 && speed <=20.7){
		return 8;
	} else if (speed > 20.7 && speed <=24.4){
		return 9;
	} else if (speed > 24.4 && speed <=28.4){
		return 10;
	} else if (speed > 28.4 && speed <=32.6){
		return 11;
	} else if (speed > 32.6){
		return 12;
	} else {
		return 'undefined';
	}
}
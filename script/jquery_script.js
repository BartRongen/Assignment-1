var markers=[];
var lat;
var lng;

$(document).ready(function() {
	initMap();
	$('.btn-x-head').click(removeAll);
});

function initMap() {
  // Create a map object and specify the DOM element for display.
		var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 52, lng: 5},
		disableDefaultUI: true,
		draggableCursor: 'crosshair',
		scrollwheel: true,
		disableDoubleClickZoom: true,
		zoom: 7
	  });
		map.addListener('click', function(event) {
			lat = event.latLng.lat();
			lng = event.latLng.lng();
			var marker = new google.maps.Marker({
				position: {lat, lng},
				map: map,
			});
				markers.push(marker);
			if(markers.length > 5){
				angular.element(document.getElementById('ContainerId')).scope().remove(0, true);
			}
			getAPI(markers.length-1);
		});
};

function removeAll() {
	for (i=0; i<markers.length; i++){
		markers[i].setMap(null);
	}
	markers = [];
	angular.element(document.getElementById('ContainerId')).scope().cleararray();
}

function getAPI(index) {
	lat = markers[index].getPosition().lat();
	lng = markers[index].getPosition().lng();
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" +lng+ "&units=metric&APPID=0bab358f3868166c4fe2006fc0b415d0",
		function() {
		})
		.success(function(data){
			angular.element(document.getElementById('ContainerId')).scope().datatransferred(data, index);
		});
}

function removeMarker(i) {
	markers[i].setMap(null);
	markers.splice(i,1);
}
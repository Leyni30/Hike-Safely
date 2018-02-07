var list = [];
// var mapDiv = $("<div id=map>");
var latitude = 0;
var longitude = 0;

$(".btn").on("click", function() {	

	var city = "Denver";
	$("#displayHikesHere").empty();
	$.ajax({
  	url: "https://trailapi-trailapi.p.mashape.com/?limit=25&q[activities_activity_type_name_eq]=hiking&q[city_cont]=" + city,
  	method: 'GET',
  	headers: {"X-Mashape-Key": "QNW46AsiVOmshebCgw9bLIZKNupLp1alRLsjsnB3T9YybL0dfV"}
	}).done(function(resultOne) {

		for (var i = 0; i < resultOne.places.length; i++) {
			latitude = resultOne.places[i].lat;
			longitude = resultOne.places[i].lon;
			list = []; 
			var hikeLength = resultOne.places[i].activities[0].length;
			var trailUrl = resultOne.places[i].activities[0].url
			var directions = resultOne.places[i].directions;
			var trailName = resultOne.places[i].name;
			var newDiv = $("<div class=trails>");
			newDiv.attr("data-lon", longitude);
			newDiv.attr("data-lat", latitude);
			newDiv.attr("data-directions", directions);
			newDiv.attr("data-mileage", hikeLength);
			newDiv.attr("data-url", trailUrl);
			newDiv.append(trailName);
			$("#displayHikesHere").append(newDiv);
			// displayHikes(latitude, longitude, resultOne, resultOne.places[i]);
		}	
			
	})

	
})

$(document).on("click", ".trails", function() {
	var longitude = $(this).attr("data-lon");
	var latitude = $(this).attr("data-lat");
	var directions = $(this).attr("data-directions");
	var mileage = $(this).attr("data-mileage");
	var url = $(this).attr("data-url");
	var trailName = $(this).text();
	displayHikes(latitude, longitude, directions, mileage, url, trailName);


})

function displayHikes(latitude, longitude, directions, mileage, url, name) {
	$.ajax({
			url: "http://api.inaturalist.org/v1/observations?lat=" + latitude + "&lng=" + longitude + "&radius=25&order=desc&order_by=created_at",
			method: 'GET',
		}).done(function(resultTwo) {
			
			
				var newDiv = $("<div>");
				var otherDiv = $("<div>");
				var directionsDiv = $("<div>");
				var mileageDiv = $("<div>");
				var urlDiv = $("<div>");
				initMap(latitude, longitude);
				mileageDiv.append(mileage);
				urlDiv.append("<a href=" + url + " target=_blank>" + url + "</a>");
				directionsDiv.append(directions);
				newDiv.append(name);
				newDiv.append(directionsDiv);
				newDiv.append(mileageDiv);
				newDiv.append(urlDiv);
				// newDiv.append(mapDiv);
				for (var i = 0; i < resultTwo.results.length; i++) {
					if (resultTwo.results[i].taxon !== null) {
						var species = resultTwo.results[i].taxon.preferred_common_name + " ";
						if (species !== undefined && speciesCheck(species)) {
							
							if (resultTwo.results[i].photos["0"] !== undefined) {
								otherDiv.append("<a href=" + resultTwo.results[i].photos["0"].url + " target=_blank>" + species + "</a>");
							}
							else {
								otherDiv.append(species);
							}
							newDiv.append(otherDiv);
							
						}
					}			
  				}
				$("#displayHikesHere").append(newDiv);		
			
		})
}

function speciesCheck(species) {
	for (var i = 0; i < list.length; i++) {
		if (list[i] === species) {
			return false	
		}
	}
	list.push(species)
	return true
}

function initMap(latitude, longitude) {
	$("#map").removeClass("hide");
	var uluru = {lat: parseInt(latitude), lng: parseInt(longitude)};
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: uluru
    });
    var marker = new google.maps.Marker({
    position: uluru,
    map: map
    });
    
}




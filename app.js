var list = [];

$(".btn").on("click", function() {	

	$("#displayHikesHere").empty();
	$.ajax({
  	url: "https://trailapi-trailapi.p.mashape.com/?limit=25&q[activities_activity_type_name_eq]=hiking&q[city_cont]=Denver",
  	method: 'GET',
  	headers: {"X-Mashape-Key": "hUjiqoTf46mshNz1t3PvUtwEYXFEp1WjzBRjsnocvbUtXEkT9u"}
	}).done(function(resultOne) {
		var latitude;
		var longitude;
		// console.log(resultOne);
		for (var i = 0; i < resultOne.places.length; i++) {
			latitude = resultOne.places[i].lat;
			longitude = resultOne.places[i].lon;
			list = []; 
			displayHikes(latitude, longitude, resultOne, resultOne.places[i]);
		}	
			
	})

	
})

function displayHikes(latitude, longitude, result, resultOne) {
	$.ajax({
			url: "http://api.inaturalist.org/v1/observations?lat=" + latitude + "&lng=" + longitude + "&radius=25&order=desc&order_by=created_at",
			method: 'GET',
		}).done(function(resultTwo) {
			console.log(resultTwo);
			for (var i = 0; i < result.places.length; i++) {
				var newDiv = $("<div>");
				var otherDiv = $("<div>");
				var directionsDiv = $("<div>");
				var mapDiv = $("<div>");
				var trailName = resultOne.name;
				var directions = resultOne.directions;
				directionsDiv.append(directions);
				newDiv.append(trailName);
				newDiv.append(directionsDiv);
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
			}
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
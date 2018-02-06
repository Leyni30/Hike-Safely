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
			displayHikes(latitude, longitude, resultOne);
		}	
			
	})

	
})

function displayHikes(latitude, longitude, resultOne) {
	$.ajax({
			url: "http://api.inaturalist.org/v1/observations?lat=" + latitude + "&lng=" + longitude + "&radius=25&order=desc&order_by=created_at",
			method: 'GET',
		}).done(function(resultTwo) {
			
			for (var i = 0; i < resultOne.places.length; i++) {
				var newDiv = $("<div>");
				var otherDiv = $("<div>");
				console.log(resultOne.places[i]);
				var trailName = resultOne.places[i].name;
				newDiv.append(trailName);
				for (var i = 0; i < resultTwo.results.length; i++) {
					if (resultTwo.results[i].taxon !== null) {
						var species = resultTwo.results[i].taxon.preferred_common_name + " ";
						if (species !== undefined) {
							otherDiv.append(species);
							newDiv.append(otherDiv);
							
						}
					}			
  				}
				$("#displayHikesHere").append(newDiv);
				console.log("Hi");			
			}
		})
}
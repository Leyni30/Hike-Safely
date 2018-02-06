var latitude;
var longitude;

$(".btn").on("click", function() {	

	$.ajax({
  	url: "https://trailapi-trailapi.p.mashape.com/?limit=25&q[activities_activity_type_name_eq]=hiking&q[city_cont]=Denver",
  	method: 'GET',
  	headers: {"X-Mashape-Key": "hUjiqoTf46mshNz1t3PvUtwEYXFEp1WjzBRjsnocvbUtXEkT9u"}
	}).done(function(result) {
		console.log(result.places.length);
		var numberResults = result.places.length;
		$("#displayHikesHere").empty();
		for (var i = 0; i < result.places.length; i++) {
			var newDiv = $("<div>");
			var trailName = result.places[i].name;
			newDiv.append(trailName);
			latitude = result.places[i].lat;
			longitude = result.places[i].lon;
			
			$.ajax({
  				url: "http://api.inaturalist.org/v1/observations?lat=" + latitude + "&lng=" + longitude + "&radius=25&order=desc&order_by=created_at",
  				method: 'GET',
				}).done(function(result) {
					console.log(result.results[i].taxon.preferred_common_name);
					var species = result.results[i].taxon.preferred_common_name;
					newDiv.append(species);
		
	  
				})
		$("#displayHikesHere").append(newDiv);
			

		}
		
	  
	})

	
})
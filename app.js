	$.ajax({
  	url: "https://trailapi-trailapi.p.mashape.com/?limit=25&q[activities_activity_type_name_eq]=hiking&q[city_cont]=Denver",
  	method: 'GET',
  	headers: {"X-Mashape-Key": "hUjiqoTf46mshNz1t3PvUtwEYXFEp1WjzBRjsnocvbUtXEkT9u"}
	}).done(function(result) {
		console.log(result.places.length);
		var numberResults = result.places.length;
		$("#displayHikesHere").empty();
		for (var i = 0; i < numberResults; i++) {
			var newDiv = $("<div>");
			var trailName = result.places[i].name;
			console.log(trailName);
		}
		
	  
	})

	$.ajax({
  	url: "http://api.inaturalist.org/v1/observations?lat=43&lng=-105&radius=25&order=desc&order_by=created_at",
  	method: 'GET',
	}).done(function(result) {
		console.log(result);
		
	  
	})
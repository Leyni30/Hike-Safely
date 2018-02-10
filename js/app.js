// var list = [];

// var latitude = 0;
// var longitude = 0;

// $(".fs-submit").on("click", function() {

//     var location = $("#q1").val().trim();
//     var locationArray = location.split(",");
//     var city = locationArray[0];

//     var city = "Denver";
//     var distance = 25;
//     $("#displayTrailsHere").empty();
//     $.ajax({
//         url: "https://trailapi-trailapi.p.mashape.com/?limit=25&q[activities_activity_type_name_eq]=hiking&q[city_cont]=" + city + "&radius=" + distance,
//         method: 'GET',
//         headers: { "X-Mashape-Key": "QNW46AsiVOmshebCgw9bLIZKNupLp1alRLsjsnB3T9YybL0dfV" }
//     }).done(function(resultOne) {
//         $("#serch-form").addClass('hide')
//         $("#result-wrap").removeClass('hide');
//         $("body").removeClass("test1"); 
//         $("body").addClass('test2');

//         for (var i = 0; i < resultOne.places.length; i++) {
//             latitude = resultOne.places[i].lat;
//             longitude = resultOne.places[i].lon;
//             list = [];
//             var hikeLength = resultOne.places[i].activities[0].length;
//             var trailUrl = resultOne.places[i].activities[0].url
//             var directions = resultOne.places[i].directions;
//             var trailName = resultOne.places[i].name;
//             var newDiv = $("<button type=button class=trails btn btn-primary data-toggle=modal data-target=#centralModalFluid></button>");
//             newDiv.attr("data-lon", longitude);
//             newDiv.attr("data-lat", latitude);
//             newDiv.attr("data-directions", directions);
//             newDiv.attr("data-mileage", hikeLength);
//             newDiv.attr("data-url", trailUrl);
//             newDiv.append(trailName);
//             $("#displayTrailsHere").append(newDiv);
//         }

//     })


// })

// $(document).on("click", ".trails", function() {
//     var longitude = $(this).attr("data-lon");
//     var latitude = $(this).attr("data-lat");
//     var directions = $(this).attr("data-directions");
//     var mileage = $(this).attr("data-mileage");
//     var url = $(this).attr("data-url");
//     var trailName = $(this).text();
//     displayHikes(latitude, longitude, directions, mileage, url, trailName);


// })

// function displayHikes(latitude, longitude, directions, mileage, url, name) {
//     $.ajax({
//         url: "http://api.inaturalist.org/v1/observations?lat=" + latitude + "&lng=" + longitude + "&radius=25&order=desc&order_by=created_at",
//         method: 'GET',
//     }).done(function(resultTwo) {

//         $(".heading").empty();
//         $("#displayHikesHere").empty();
//         var newDiv = $("<div>");
//         var otherDiv = $("<div id=wildlife>");
//         var directionsDiv = $("<div id=directions>");
//         var mileageDiv = $("<div id=mileage>");
//         var urlDiv = $("<div id=url>");
//         if (parseFloat(longitude) !== 0 || parseFloat(latitude) !== 0) {
//             initMap(latitude, longitude);
//         } else {
//             $("#map").html("Sorry we do not have information for the exact location of this trail. Please see the link to the right for more information.")
//         }
//         if (mileage !== "" && mileage !== "0") {
//             mileageDiv.append("Miles: " + mileage);
//         }
//         if (url !== "") {
//             urlDiv.append("<a href=" + url + " target=_blank>" + url + "</a>");
//         }
//         if (directions !== "") {
//             directionsDiv.append("Directions: " + directions);
//         }
//         $(".heading").append(name);
//         newDiv.append(directionsDiv);
//         newDiv.append(mileageDiv);
//         newDiv.append(urlDiv);
//         otherDiv.append("Wildlife: ")
//         for (var i = 0; i < resultTwo.results.length; i++) {
//             if (resultTwo.results[i].taxon !== null) {
//                 var species = resultTwo.results[i].taxon.preferred_common_name + " ";
//                 if (species !== undefined && speciesCheck(species)) {

//                     if (resultTwo.results[i].photos["0"] !== undefined) {
//                         otherDiv.append("<a href=" + resultTwo.results[i].photos["0"].url + " target=_blank>" + species + "</a>");
//                     } else {
//                         otherDiv.append(species);
//                     }
//                     newDiv.append(otherDiv);

//                 }
//             }
//         }
//         $("#displayHikesHere").append(newDiv);

//     })
// }

// function speciesCheck(species) {
//     for (var i = 0; i < list.length; i++) {
//         if (list[i] === species) {
//             return false
//         }
//     }
//     list.push(species)
//     return true
// }

// function initMap(latitude, longitude) {
//     $("#map").removeClass("hide");
//     var uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 11,
//         center: uluru
//     });
//     var marker = new google.maps.Marker({
//         position: uluru,
//         map: map
//     });

// }

// Initialize the firebase database.
var config = {
    apiKey: "AIzaSyCzOF0gNskeJlvYH5484yDq5wwRjH57W8o",
    authDomain: "hike-safely.firebaseapp.com",
    databaseURL: "https://hike-safely.firebaseio.com",
    projectId: "hike-safely",
    storageBucket: "",
    messagingSenderId: "395371086661"
  };
  firebase.initializeApp(config);

// Create a letter array variable that will be used to assign a random reference to each user in the firebase database.
var array = ["a","b","c","d","e","f","g","h","f","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"];
// Create a variable for the firebase database
var dataRef = firebase.database();
// Create variables for the current firebase user, for firebase users, for firebase connections, and for the connected state of users. The connect state indicates whether or not a user is connected to firebase. 
var currentUser = "";
var users = dataRef.ref("/users");
var connectionsRef = dataRef.ref("/connections");
var connectedRef = dataRef.ref(".info/connected");
// Call a function when the connected state of a user changes in firebase.
connectedRef.on("value", function(snap) {

  // If the user is connected, generate a random reference for the user by cycling through the array of letters.
  if (snap.val()) {
    for (var i = 0; i < 10; i++) {
      var random = array[Math.floor(Math.random() * array.length)];
      currentUser += random;
    }
    // Create a variable for the current user in the connections list.
    var con = connectionsRef.push(currentUser);
    // Create a variable for the current user in the users list.
    var current = dataRef.ref("/users/" + currentUser);
    // Remove the user from the connections list when the user is disconnected from firebase.
    con.onDisconnect().remove();
    // Remove the child of the user from the connections list when the user is disconnected from firebase.
    dataRef.ref("/users/").child(currentUser).onDisconnect().remove()
  }
// If an error occurs while running the function for a change in the user's connected state, display an error message in the console log.
}, function(errorObject) {
     console.log("The read failed: " + errorObject.code);
    
});
// Set a global variable for an array that will contain a list of species, and set global variables for the latitude and longitude.
var speciesList = [];
var latitude = 0;
var longitude = 0;
// Call a function when the user clicks the Submit button.
$(".fs-submit").on("click", function() {
    // Set up variables for the trail API filters. The user enters the filter for the city, which is derived from the location in the trail API. The user also enters the filter for the number of trails to view.
    var location = $("#q1").val().trim();
    var number = $("#q2").val().trim();
    var locationArray = location.split(",");
    var city = locationArray[0];
    // Assign a city to the current user in the users list in firebase.
    var current = dataRef.ref("/users/" + currentUser);
    current.set({
          location: city,     
      });
    // Call a function for the current user in firebase.
    current.on("value", function(snap){
        // If the city value is available, call the function to retrieve the trail data from the trail API.
        if (snap.val().location !== null) {
            displayTrails(snap.val().location, number);
        }
    // If an error occurs while running the function to retrieve the trail data, display an error message in the console log.
    }), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    }
});
// Create the function that retrieves trail data from the trail API by using the city and number of trails that the user enters.    
function displayTrails (city, number) { 
    // Create a AJAX call to retrieve trail data from the trail API.
    $.ajax({
        url: "https://trailapi-trailapi.p.mashape.com/?limit=" + number + "&q[activities_activity_type_name_eq]=hiking&q[city_cont]=" + city,
        method: 'GET',
        headers: { "X-Mashape-Key": "QNW46AsiVOmshebCgw9bLIZKNupLp1alRLsjsnB3T9YybL0dfV" }
    }).done(function(resultOne) {
        // Hide the search form, show the search results, and show the Search Again button.
        $("#serch-form").addClass('hide')
        $("#result-wrap").removeClass('hide');
        $("body").removeClass("test1"); 
        $("body").addClass('test2');
        $("#restart").removeClass('hide');
        // Clear the div that holds all application data.
        $("#displayTrailsHere").empty();
        // Cycle through the results of the trail AJAX call to extract the data for each trail.
        for (var i = 0; i < resultOne.places.length; i++) {
            // Create variables for the latitude and longitude of the trail.
            latitude = resultOne.places[i].lat;
            longitude = resultOne.places[i].lon;
            // Clear any data from the species array.
            speciesList = [];
            // Create variables for the name, mileage, URL, and directions to access the trail.
            var trailMileage = resultOne.places[i].activities[0].length;
            var trailUrl = resultOne.places[i].activities[0].url
            var directions = resultOne.places[i].directions;
            var trailName = resultOne.places[i].name;
            // Create a new div to hold a button that the user clicks to view trail details.
            var newDiv = $("<button type=button class=trails btn btn-primary data-toggle=modal data-target=#centralModalFluid></button>");
            // Assign the variables for the trail data (longitude, latitude, mileage, URL, and directions to access the trail) to attributes in the new div.
            newDiv.attr("data-lon", longitude);
            newDiv.attr("data-lat", latitude);
            newDiv.attr("data-directions", directions);
            newDiv.attr("data-mileage", trailMileage);
            newDiv.attr("data-url", trailUrl);
            // Append the trail name variable to the new div.
            newDiv.append(trailName);
            // Append the new div to the div that holds all application data.
            $("#displayTrailsHere").append(newDiv);
        }

    })
}




// When the user clicks a trail button, call a function to create variables for the attributes in the new div, and create a variable for the trail name in the new div.
$(document).on("click", ".trails", function() {
    var longitude = $(this).attr("data-lon");
    var latitude = $(this).attr("data-lat");
    var directions = $(this).attr("data-directions");
    var mileage = $(this).attr("data-mileage");
    var url = $(this).attr("data-url");
    var trailName = $(this).text();
    // Call the function that takes in the trail data variables to display the trail detail.
    displayHikes(latitude, longitude, directions, mileage, url, trailName);


})
// Create the function to display the trail detail and wildlife data.
function displayHikes(latitude, longitude, directions, mileage, url, name) {
    // Create a AJAX call to retrieve wildlife data from the iNaturalist API. This call filters returned data using the latitude and longitude from the trail API.
    $.ajax({
        url: "https://api.inaturalist.org/v1/observations?lat=" + latitude + "&lng=" + longitude + "&radius=25&order=desc&order_by=created_at",
        method: 'GET',
    }).done(function(resultTwo) {
        // Clear the div that holds the heading for the trail name.
        $(".heading").empty();
        // Clear the div that holds all application data.
        $("#displayHikesHere").empty();
        // Create a new div to hold trail data.
        var newDiv = $("<div>");
        // Create a new div to hold wildlife data from iNaturalist API call.
        var wildlifeDiv = $("<div id=wildlife>");
        // Create variables to hold the divs for the trail mileage, URL, and directions to trail.
        var directionsDiv = $("<div id=directions>");
        var mileageDiv = $("<div id=mileage>");
        var urlDiv = $("<div id=url>");
        // If the longitude or latitude is available, call the function to display the map. Otherwise, show a message about map unavailability to the user.
        if (parseFloat(longitude) !== 0 || parseFloat(latitude) !== 0) {
            initMap(latitude, longitude);
        } else {
            $("#map").html("A map of this trail is not available. For more information about the trail, click the trail link.")
        }
        // If trail mileage is available, append a Trail Miles title and mileage data to the div for mileage.
        if (mileage !== "" && mileage !== "0") {
            mileageDiv.append("Trail Miles: " + mileage);
        }
        // If the URL is available, append the URL to the div for the URL.
        if (url !== "") {
            urlDiv.append("<a href=" + url + " target=_blank>" + url + "</a>");
        }
        // If directions are available, append a Directions to Trail title and the directions data to the div for directions.
        if (directions !== "") {
            directionsDiv.append("Directions to Trail: " + directions);
        }
        // Append the trail name to the div that displays the heading for the trail name.
        $(".heading").append(name);
        // Append the divs for mileage, the URL, and directions to the div that holds trail data.
        newDiv.append(directionsDiv);
        newDiv.append(mileageDiv);
        newDiv.append(urlDiv);
        // Append a Trail Wildlife title to the wildlife div.
        wildlifeDiv.append("Trail Wildlife: ")
        // Cycle through the species group results of the iNaturalist call to extract each species name, and assign this name to a variable.
        for (var i = 0; i < resultTwo.results.length; i++) {
            if (resultTwo.results[i].taxon !== null) {
                var species = resultTwo.results[i].taxon.preferred_common_name + " ";
                // If the species is available from the iNaturalist API or is not already in the species array that the speciesCheck function creates, and if a photo is available from the iNaturalist API, append the photo and species name to the div that holds the wildlife data.
                if (species !== undefined && speciesCheck(species)) {

                    if (resultTwo.results[i].photos["0"] !== undefined) {
                        wildlifeDiv.append("<a href=" + resultTwo.results[i].photos["0"].url + " target=_blank>" + species + "</a>");
                    // If a photo is not available from the iNaturalist API, append only species name to the div that holds the wildlife data.
                    } else {
                        wildlifeDiv.append(species);
                    }
                    // Append the div that holds the wildlife data to the div that holds the trail data.
                    newDiv.append(wildlifeDiv);

                }
            }
        }
        // Append the div that holds the trail data to the div that holds all application data.
        $("#displayHikesHere").append(newDiv);

    })
}
// Call a function to determine if a species already exists in the species array. This function avoids showing the species more than once for a trail data record.
function speciesCheck(species) {
    // If the species already exists in the species array, take no further action.
    for (var i = 0; i < speciesList.length; i++) {
        if (speciesList[i] === species) {
            return false
        }
    }
    // If the species does not already exist in the species array, add the species to the array.
    speciesList.push(species)
    return true
}
// Call a function when the user clicks the Search Again button.
$("#restart").on("click", function resetSearch() {
    // Show the search form, hide the search results, and hide the Search Again button.
    $("#serch-form").removeClass('hide')
    $("#result-wrap").addClass('hide');
    $("body").addClass("test1"); 
    $("body").removeClass('test2');
    $("#restart").addClass('hide');
    // Clear the div that holds all application data.
    $("#displayTrailsHere").empty();
    // Remove the child of the user from the connections list when the user is disconnected from firebase.
    dataRef.ref("/users/").child(currentUser).remove();
})
// Create a function that takes in latitude and longitude to retrieve the map for the trail.
function initMap(latitude, longitude) {
    // Before displaying the map, remove the class to hide the map.
    $("#map").removeClass("hide");
    // Set up the zoom feature for the map.
    var uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: uluru
    });
    // Set up the marker for the trail on the map.
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

}


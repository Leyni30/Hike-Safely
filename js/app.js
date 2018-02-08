var config = {
    apiKey: "AIzaSyCzOF0gNskeJlvYH5484yDq5wwRjH57W8o",
    authDomain: "hike-safely.firebaseapp.com",
    databaseURL: "https://hike-safely.firebaseio.com",
    projectId: "hike-safely",
    storageBucket: "",
    messagingSenderId: "395371086661"
  };
  firebase.initializeApp(config);


var array = ["a","b","c","d","e","f","g","h","f","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"];
// Create a variable for the firebase database
var dataRef = firebase.database();
var currentUser = "";
var users = dataRef.ref("/users");
var connectionsRef = dataRef.ref("/connections");
var connectedRef = dataRef.ref(".info/connected");
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    for (var i = 0; i < 10; i++) {
      var random = array[Math.floor(Math.random() * array.length)];
      currentUser += random;
    }
    var con = connectionsRef.push(currentUser);
    var current = dataRef.ref("/users/" + currentUser);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
    // current.child.remove();
    dataRef.ref("/users/").child(currentUser).onDisconnect().remove()
  }
}, function(errorObject) {
     console.log("The read failed: " + errorObject.code);
    
});
var list = [];

var latitude = 0;
var longitude = 0;

$(".fs-submit").on("click", function() {

    var location = $("#q1").val().trim();
    var number = $("#q2").val().trim();
    var locationArray = location.split(",");
    var city = locationArray[0];

    var current = dataRef.ref("/users/" + currentUser);
    current.set({
          location: city,
          
      });
    current.on("value", function(snap){
        if (snap.val().location) {
            displayTrails(snap.val().location, number);
        }
    }), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    }
});
    
function displayTrails (city, number) { 
    $("#displayTrailsHere").empty();
    $.ajax({
        url: "https://trailapi-trailapi.p.mashape.com/?limit=" + number + "&q[activities_activity_type_name_eq]=hiking&q[city_cont]=" + city,
        method: 'GET',
        headers: { "X-Mashape-Key": "QNW46AsiVOmshebCgw9bLIZKNupLp1alRLsjsnB3T9YybL0dfV" }
    }).done(function(resultOne) {
        $("#serch-form").addClass('hide')
        $("#result-wrap").removeClass('hide');
        $("body").removeClass("test1"); 
        $("body").addClass('test2');

        for (var i = 0; i < resultOne.places.length; i++) {
            latitude = resultOne.places[i].lat;
            longitude = resultOne.places[i].lon;
            list = [];
            var hikeLength = resultOne.places[i].activities[0].length;
            var trailUrl = resultOne.places[i].activities[0].url
            var directions = resultOne.places[i].directions;
            var trailName = resultOne.places[i].name;
            var newDiv = $("<button type=button class=trails btn btn-primary data-toggle=modal data-target=#centralModalFluid></button>");
            newDiv.attr("data-lon", longitude);
            newDiv.attr("data-lat", latitude);
            newDiv.attr("data-directions", directions);
            newDiv.attr("data-mileage", hikeLength);
            newDiv.attr("data-url", trailUrl);
            newDiv.append(trailName);
            $("#displayTrailsHere").append(newDiv);
        }

    })
}





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
        url: "https://api.inaturalist.org/v1/observations?lat=" + latitude + "&lng=" + longitude + "&radius=25&order=desc&order_by=created_at",
        method: 'GET',
    }).done(function(resultTwo) {

        $(".heading").empty();
        $("#displayHikesHere").empty();
        var newDiv = $("<div>");
        var otherDiv = $("<div id=wildlife>");
        var directionsDiv = $("<div id=directions>");
        var mileageDiv = $("<div id=mileage>");
        var urlDiv = $("<div id=url>");
        if (parseFloat(longitude) !== 0 || parseFloat(latitude) !== 0) {
            initMap(latitude, longitude);
        } else {
            $("#map").html("Sorry we do not have information for the exact location of this trail. Please see the link to the right for more information.")
        }
        if (mileage !== "" && mileage !== "0") {
            mileageDiv.append("Miles: " + mileage);
        }
        if (url !== "") {
            urlDiv.append("<a href=" + url + " target=_blank>" + url + "</a>");
        }
        if (directions !== "") {
            directionsDiv.append("Directions: " + directions);
        }
        $(".heading").append(name);
        newDiv.append(directionsDiv);
        newDiv.append(mileageDiv);
        newDiv.append(urlDiv);
        otherDiv.append("Wildlife: ")
        for (var i = 0; i < resultTwo.results.length; i++) {
            if (resultTwo.results[i].taxon !== null) {
                var species = resultTwo.results[i].taxon.preferred_common_name + " ";
                if (species !== undefined && speciesCheck(species)) {

                    if (resultTwo.results[i].photos["0"] !== undefined) {
                        otherDiv.append("<a href=" + resultTwo.results[i].photos["0"].url + " target=_blank>" + species + "</a>");
                    } else {
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
    var uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

}
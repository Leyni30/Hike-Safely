

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCzLuyIXvJV7lczmm6ybcvo32vr0jYukU",
    authDomain: "hike-safely-project.firebaseapp.com",
    databaseURL: "https://hike-safely-project.firebaseio.com",
    projectId: "hike-safely-project",
    storageBucket: "",
    messagingSenderId: "420632159516"
  };
  firebase.initializeApp(config);

  // Create a variable for the firebase database
  var dataRef = firebase.database();

  // Capture the Submit button click to get user-input values and assign them to variables
  $("#submit-button").on("click", function(event) {
      event.preventDefault();

      var location = $("#location-input").val().trim();
      var hikeRadius = $("#radius-input").val().trim();

      // Push user input values to the firebase database
      dataRef.ref().push({
          location: location,
          hike radius: hikeRadius
          
      });

      // Reset the form after user input
      document.getElementById("form-input").reset();

  });

  // Retrieve user input values from the database and assign them to variables
  dataRef.ref().on("child_added", function(childSnapshot) {
      
      var locationVal = childSnapshot.val().location;
      var hikeRadiusVal = childSnapshot.val().hikeRadius;





	
		
	  
	})
    

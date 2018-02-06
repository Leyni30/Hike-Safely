

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

      var trainName = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
    

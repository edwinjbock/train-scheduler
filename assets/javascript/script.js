// BEGINNING OF SCRIPT.JS

// ********** GLOBAL DECLARATIONS **********
// Variables related to the scripting logic

/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyDsNqjkN1y0BrzuNTiR72CXXh4HlfKQ-Gk",
  authDomain: "train-scheduler-7ff53.firebaseapp.com",
  databaseURL: "https://train-scheduler-7ff53.firebaseio.com",
  projectId: "train-scheduler-7ff53",
  storageBucket: "train-scheduler-7ff53.appspot.com",
  messagingSenderId: "182214102587"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Whenever a user clicks the submit-bid button
$("#submitButton").on("click", function (event) {
  event.preventDefault();

  // Get the input values
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var frequency = $("#frequency").val().trim();
  var time = $("#time").val().trim();
  rate = parseInt(rate);

  // Change what is saved in firebase
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    time: time
  });

}); // End of .on click

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("child_added", function (snapshot) {
  console.log("Moment Now:" + moment().format());
  console.log("Now-then=" + moment().diff(snapshot.val().time, "minutes"));

  // Display Data Added]
  $("#databaseDump").append(
    '<tr>' +
    '<td>' + snapshot.val().trainName + '</td>' +
    '<td>' + snapshot.val().destination + '</td>' +
    '<td>' + snapshot.val().frequency + '</td>' +
    '<td>' + snapshot.val().time + '</td>' +
    '<td>' + moment().diff(snapshot.val().time, "minutes") + '</td>' +
    '</tr>'
  );

}); // End of function(snapshot)

// END OF FILE
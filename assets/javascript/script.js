// BEGINNING OF SCRIPT.JS

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
  var firstArrival = $("#firstArrival").val().trim();
  // rate = parseInt(rate);

  // Change what is saved in firebase
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstArrival: firstArrival
  });

}); // End of .on click

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("child_added", function (snapshot) {
  
  console.log("********** FIREBASE DATA *************");
  console.log("trainName:" + snapshot.val().trainName);
  console.log("destination:" + snapshot.val().destination);
  console.log("frequency:" + snapshot.val().frequency);
  console.log("firstArrival:" + snapshot.val().firstArrival);

  console.log("********** CALCULATIONS *************");
  var trainStartTime = moment(snapshot.val().firstArrival, "HH:mm").subtract(1, "years");
  var trainFrequency = snapshot.val().frequency;
  var momentNow = moment().format("HH:mm");
  var diffStartAndNow = moment().diff(moment(trainStartTime, "HH:mm"));
  var remainderTime = diffStartAndNow % trainFrequency;
  var minutesUntilTrain = trainFrequency - remainderTime;
  var nextTrainArrival = moment().add(minutesUntilTrain, "minutes");
  var nextTrainArrivalFormatted = moment(nextTrainArrival).format("LT");

  console.log("trainName:" + snapshot.val().trainName);
  console.log("momentNow: " + momentNow);
  console.log("trainStartTime: " + trainStartTime);
  console.log("trainFrequency: " + trainFrequency);
  console.log("diffStartAndNow: " + diffStartAndNow);
  console.log("remainderTime: " + remainderTime);
  console.log("minutesUntilTrain: " + minutesUntilTrain);
  console.log("nextTrainArrival: " + nextTrainArrivalFormatted);

  // Display Data Added]
  $("#databaseDump").append(
    '<tr>' +
    '<td>' + snapshot.val().trainName + '</td>' +
    '<td>' + snapshot.val().destination + '</td>' +
    '<td>' + snapshot.val().frequency + '</td>' +
    '<td>' + snapshot.val().firstArrival + '</td>' +
    '<td>' + minutesUntilTrain + '</td>' +
    '<td>' + nextTrainArrivalFormatted + '</td>' +
    // '<td>' + moment() + '</td>' +
    '</tr>'
  );

}); // End of function(snapshot)

// END OF FILE
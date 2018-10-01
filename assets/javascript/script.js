// BEGINNING OF SCRIPT.JS

// ********** GLOBAL DECLARATIONS **********
// Variables related to the scripting logic

/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyDFqYOlltkXjtEb1lRMa26hc7po_f4NAOE",
  authDomain: "time-sheet-276ad.firebaseapp.com",
  databaseURL: "https://time-sheet-276ad.firebaseio.com",
  projectId: "time-sheet-276ad",
  storageBucket: "time-sheet-276ad.appspot.com",
  messagingSenderId: "518798022156"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Whenever a user clicks the submit-bid button
$("#submitButton").on("click", function (event) {
  event.preventDefault();

  // Get the input values
  var name = $("#name").val().trim();
  var role = $("#role").val().trim();
  var startDate = $("#startDate").val().trim();
  var rate = $("#rate").val().trim();
  rate = parseInt(rate);
  var monthsWorked;
  var totalBill;

  // Change what is saved in firebase
  database.ref().push({
    name: name,
    role: role,
    startDate: startDate,
    rate: rate,
  });

}); // End of .on click

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("child_added", function (snapshot) {
  console.log("Moment Now:" + moment().format());
  console.log("Now-then=" + moment().diff(snapshot.val().startDate, "months"));

  // Display Data Added]
  $("#databaseDump").append(
    '<tr>' +
    '<td>' + snapshot.val().name + '</td>' +
    '<td>' + snapshot.val().role + '</td>' +
    '<td>' + snapshot.val().startDate + '</td>' +
    '<td>' + snapshot.val().rate + '</td>' +
    '<td>' + moment().diff(snapshot.val().startDate, "months") + '</td>' +
    '<td>' + snapshot.val().rate * moment().diff(snapshot.val().startDate, "months") + '</td>' +
    '</tr>'
  );

}); // End of function(snapshot)

// END OF FILE

$(document).ready(function () {
    //1. Firebase Link
    var trainData = new Firebase("https://train-database.firebaseio.com");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCg279X1i7yAgOMzDhJPHi6muB_AD8Glok",
        authDomain: "gtbcproject1.firebaseapp.com",
        databaseURL: "https://gtbcproject1.firebaseio.com",
        projectId: "gtbcproject1",
        storageBucket: "gtbcproject1.appspot.com",
        messagingSenderId: "368018462192"
    };
    var database = firebase.database();

    //2. Button for Adding Trains
    $("#add-train-btn").on("click", function() {

        //3. Grab user input and assign as variables
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var trainStartInput = moment($("#train-start-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequencyInput = $("#frequency-input").val().trim();

        //4.Log everything to console
        console.log(trainName);
        console.log(destination);
        console.log(trainStartInput);
        console.log(frequencyInput);


        //5.Creates local temporary object for holding train data to be
        // pushed to firebase
        var newTrain = {

            name: trainName,
            destination: destination,
            traintime: trainStartInput,
            frequency: frequencyInput,
            nextTrain: nextTrain,
            min: minutesUntilTrain,

        }

        //6. Pushing train info to firebase
        trainData.push(newTrain);

        //clear text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#train-start-input").val("");
        $("#frequency-input").val("");

        //prevents page reload

        return false;

    });

    trainData.on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());


        // 7. Assign firebase variables to snapshots

        var firebasetrainName = childSnapshot.val().trainName;
        var firebaseDestination = childSnapshot.val().destination;
        var firebasetrainStartInput = childSnapshot.val().start;
        var firebaseFrequency = childSnapshot.val().frequency;


        var diffTime = moment().diff(moment.unix(firebasetrainStartInput), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebasetrainStartInput), "minutes") % firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;
        var nextTrainArrival = moment().format("hh:mm A");

       // Add each train's data into the table
        $("#trains-table > tbody").append("<tr><td>" + train + "</td>td><td>" + trainName + "</td><td>" + destination
            + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>"+ nextTrain + "</td><td>" + status +
             "</td></tr>");
    }

})
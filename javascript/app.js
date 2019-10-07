
  var firebaseConfig = {
    apiKey: "AIzaSyBYpLZcubc0OvFI7giFtNn8uXtgb_heSdY",
    authDomain: "trainschedule-e306e.firebaseapp.com",
    databaseURL: "https://trainschedule-e306e.firebaseio.com",
    projectId: "trainschedule-e306e",
    storageBucket: "",
    messagingSenderId: "862843685491",
    appId: "1:862843685491:web:111bdbec5b22fde94cb806"
  };

  firebase.initializeApp(firebaseConfig);


  var database = firebase.database();

 var name;
 var destination;
 var firstTrain;
 var frequency;

 $("#addTrain").on("click", function(){
   event.preventDefault();
   name=$("#trainName").val().trim();
   destination=$("#destination").val().trim();
   firstTrain=$("#firstTrain").val().trim();
   frequency=$("#frequency").val().trim();

   database.ref().push({
     name:name,
     destination:destination,
     firstTrain:firstTrain,
     frequency:frequency,
  });

   console.log(name);
   console.log(destination);
   console.log(firstTrain);
   console.log(frequency);

   $("#trainName").text("");
   $("#destination").text("");
   $("#firstTrain").text("");
   $("#frequency").text("");
});


database.ref().on("child_added", function(childSnapshot){
  
  var minAway;
  var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1,"years");
  var dif=moment().diff(moment(firstTrainNew),"minutes");
  var remainder=dif%childSnapshot.val().frequency;
      // Minutes until next train
      var minAway = childSnapshot.val().frequency - remainder;
      // Next train time
      var nextTrain = moment().add(minAway, "minutes");
      nextTrain = moment(nextTrain).format("hh:mm");

      $("#addRow").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextTrain +  "</td><td>" + minAway + "</td></tr>");

      }, function(errorObject) {
          console.log("Errors: " + errorObject.code);
  });

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML to reflect
      $("#name-display").html(snapshot.val().name);
      $("#email-display").html(snapshot.val().email);
      $("#age-display").html(snapshot.val().age);
      $("#comment-display").html(snapshot.val().comment);
  });